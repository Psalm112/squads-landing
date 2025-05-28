import { NextRequest, NextResponse } from 'next/server'

interface ApiPlayer {
  groupId: string
  player: {
    id: string
    name: string
    imageUrl: string
    imageUrl128: string
    position: string
    team: { id: string }
    number: string | null
  }
  sport: string
  game: {
    id: string
    status: string
    isLive: boolean
    startDate: string
    league: string
    homeTeam: {
      id: string
      name: string
      abbreviation: string
      nickname: string
    }
    awayTeam: {
      id: string
      name: string
      abbreviation: string
      nickname: string
    }
  }
  market: { id: string; name: string }
  parlaySelectionsCount: number
  props: Array<{
    lines: Array<{
      id: string
      selectionLine: string
      isAvailable: boolean
    }>
    betPoints: number
    type: string
  }>
}

interface ApiResponse {
  props: ApiPlayer[]
  pagination: {
    page: number
    size: number
    totalCount: number
    lastPage: number
  }
}

// In-memory cache with TTL
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
const CACHE_KEY = 'players_shots_on_target'

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 60 // 60 requests per minute

function getRateLimitKey(request: NextRequest): string {
  // IP address or a combination of IP and user agent for rate limiting
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded
    ? forwarded.split(',')[0]
    : request.headers.get('x-real-ip') || 'unknown'
  return ip
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(key)

  if (!userLimit || now > userLimit.resetTime) {
    // Reset limit
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    })
    return false
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  userLimit.count++
  return false
}

function getCachedData(key: string) {
  const cached = cache.get(key)
  if (!cached) return null

  const now = Date.now()
  if (now - cached.timestamp > cached.ttl) {
    cache.delete(key)
    return null
  }

  return cached.data
}

function setCachedData(key: string, data: any, ttl: number = CACHE_TTL) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  })
}

async function fetchPlayersFromAPI(): Promise<ApiResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

  try {
    const response = await fetch(
      'https://api.squads.game/bet/public-props?marketType=player_shots_on_target',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'Squads-App/1.0',
        },
        signal: controller.signal,
      }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data: ApiResponse = await response.json()

    // Validate response structure
    if (!data.props || !Array.isArray(data.props)) {
      throw new Error('Invalid API response structure')
    }

    return data
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout')
      }
      throw error
    }
    throw new Error('Unknown error occurred')
  }
}

async function fetchWithRetry(maxRetries: number = 3): Promise<ApiResponse> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchPlayersFromAPI()
    } catch (error) {
      lastError = error as Error

      if (attempt === maxRetries) {
        break
      }

      // Exponential backoff
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(
              Date.now() + RATE_LIMIT_WINDOW
            ).toISOString(),
          },
        }
      )
    }

    const cachedData = getCachedData(CACHE_KEY)
    if (cachedData) {
      return NextResponse.json(cachedData, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'X-Cache-Status': 'HIT',
          'Access-Control-Allow-Origin':
            process.env.NODE_ENV === 'production'
              ? 'https://squads-landing.vercel.app'
              : '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
          Vary: 'Origin',
        },
      })
    }

    const data = await fetchWithRetry(3)

    // Cache the successful response
    setCachedData(CACHE_KEY, data)

    const userLimit = rateLimitMap.get(rateLimitKey)
    const remaining = userLimit
      ? Math.max(0, RATE_LIMIT_MAX_REQUESTS - userLimit.count)
      : RATE_LIMIT_MAX_REQUESTS - 1

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'X-Cache-Status': 'MISS',
        'Access-Control-Allow-Origin':
          process.env.NODE_ENV === 'production'
            ? 'https://squads-landing.vercel.app'
            : '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
        Vary: 'Origin',
        'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': userLimit
          ? new Date(userLimit.resetTime).toISOString()
          : new Date(Date.now() + RATE_LIMIT_WINDOW).toISOString(),
      },
    })
  } catch (error) {
    console.error('API Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      url: request.url,
      userAgent: request.headers.get('user-agent'),
    })

    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        return NextResponse.json(
          {
            error: 'Request timeout',
            message:
              'The external service is taking too long to respond. Please try again.',
          },
          { status: 504 }
        )
      }

      if (error.message.includes('status: 429')) {
        return NextResponse.json(
          {
            error: 'External API rate limited',
            message:
              'The external service is currently rate limiting requests. Please try again later.',
          },
          { status: 429 }
        )
      }
    }

    return NextResponse.json(
      {
        error: 'Service temporarily unavailable',
        message:
          'Unable to fetch player data at this time. Please try again later.',
      },
      { status: 503 }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin':
        process.env.NODE_ENV === 'production'
          ? 'https://squads-landing.vercel.app'
          : '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    },
  })
}

// Cleanup
setInterval(
  () => {
    const now = Date.now()

    for (const [key, value] of cache.entries()) {
      if (now - value.timestamp > value.ttl) {
        cache.delete(key)
      }
    }

    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  },
  5 * 60 * 1000
) // Clean up every 5 minutes
