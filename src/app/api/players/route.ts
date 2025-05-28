import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schemas
const ApiPlayerSchema = z.object({
  groupId: z.string(),
  player: z.object({
    id: z.string(),
    name: z.string(),
    imageUrl: z.string().optional(),
    imageUrl128: z.string().optional(),
    position: z.string(),
    team: z.object({
      id: z.string(),
    }),
    number: z.string().nullable(),
  }),
  sport: z.string(),
  game: z.object({
    id: z.string(),
    status: z.string(),
    isLive: z.boolean(),
    startDate: z.string(),
    league: z.string(),
    homeTeam: z.object({
      id: z.string(),
      name: z.string(),
      abbreviation: z.string(),
      nickname: z.string(),
    }),
    awayTeam: z.object({
      id: z.string(),
      name: z.string(),
      abbreviation: z.string(),
      nickname: z.string(),
    }),
  }),
  market: z.object({
    id: z.string(),
    name: z.string(),
  }),
  parlaySelectionsCount: z.number(),
  props: z.array(
    z.object({
      lines: z.array(
        z.object({
          id: z.string(),
          selectionLine: z.string(),
          isAvailable: z.boolean(),
        })
      ),
      betPoints: z.number(),
      type: z.string(),
    })
  ),
})

const ApiResponseSchema = z.object({
  props: z.array(ApiPlayerSchema),
  pagination: z.object({
    page: z.number(),
    size: z.number(),
    totalCount: z.number(),
    lastPage: z.number(),
  }),
})

type ApiPlayer = z.infer<typeof ApiPlayerSchema>
type ApiResponse = z.infer<typeof ApiResponseSchema>

// Enhanced cache with LRU-like behavior
class EnhancedCache {
  private cache = new Map<
    string,
    { data: any; timestamp: number; ttl: number; accessCount: number }
  >()
  private maxSize = 100

  get(key: string) {
    const cached = this.cache.get(key)
    if (!cached) return null

    const now = Date.now()
    if (now - cached.timestamp > cached.ttl) {
      this.cache.delete(key)
      return null
    }

    // Update access count for LRU
    cached.accessCount++
    return cached.data
  }

  set(key: string, data: any, ttl: number) {
    // Implement LRU eviction if cache is full
    if (this.cache.size >= this.maxSize) {
      const leastUsed = [...this.cache.entries()].reduce((min, [k, v]) =>
        v.accessCount < min[1].accessCount ? [k, v] : min
      )
      this.cache.delete(leastUsed[0])
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      accessCount: 0,
    })
  }

  cleanup() {
    const now = Date.now()
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > value.ttl) {
        this.cache.delete(key)
      }
    }
  }

  size() {
    return this.cache.size
  }
}

// Enhanced rate limiter with sliding window
class SlidingWindowRateLimit {
  private requests = new Map<string, number[]>()
  private readonly windowMs: number
  private readonly maxRequests: number

  constructor(windowMs: number, maxRequests: number) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
  }

  isAllowed(key: string): boolean {
    const now = Date.now()
    const requests = this.requests.get(key) || []

    // Remove old requests outside the window
    const validRequests = requests.filter((time) => now - time < this.windowMs)

    if (validRequests.length >= this.maxRequests) {
      return false
    }

    // Add current request
    validRequests.push(now)
    this.requests.set(key, validRequests)

    return true
  }

  cleanup() {
    const now = Date.now()
    for (const [key, requests] of this.requests.entries()) {
      const validRequests = requests.filter(
        (time) => now - time < this.windowMs
      )
      if (validRequests.length === 0) {
        this.requests.delete(key)
      } else {
        this.requests.set(key, validRequests)
      }
    }
  }

  getRemainingRequests(key: string): number {
    const now = Date.now()
    const requests = this.requests.get(key) || []
    const validRequests = requests.filter((time) => now - time < this.windowMs)
    return Math.max(0, this.maxRequests - validRequests.length)
  }
}

// Global instances
const cache = new EnhancedCache()
const rateLimiter = new SlidingWindowRateLimit(60 * 1000, 60) // 60 requests per minute

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
const CACHE_KEY = 'players_shots_on_target'

// Utility functions
function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded
    ? forwarded.split(',')[0].trim()
    : request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      'unknown'
  return `ip:${ip}`
}

function getCORSHeaders(origin?: string) {
  const allowedOrigins =
    process.env.NODE_ENV === 'production'
      ? ['https://squads-landing.vercel.app', 'https://squads.game']
      : ['http://localhost:3000', 'http://127.0.0.1:3000']

  const isAllowedOrigin = origin && allowedOrigins.includes(origin)

  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

async function fetchPlayersFromAPI(): Promise<ApiResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(
      'https://api.squads.game/bet/public-props?marketType=player_shots_on_target',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'Squads-Landing/1.0',
          'Cache-Control': 'no-cache',
        },
        signal: controller.signal,
      }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`, {
        cause: { status: response.status, statusText: response.statusText },
      })
    }

    const rawData = await response.json()

    // Validate response with Zod
    const validatedData = ApiResponseSchema.parse(rawData)

    return validatedData
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof z.ZodError) {
      console.error('API Response validation failed:', error.errors)
      throw new Error('Invalid API response structure')
    }

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

      if (attempt === maxRetries) break

      // Exponential backoff with jitter
      const baseDelay = Math.min(1000 * Math.pow(2, attempt - 1), 5000)
      const jitter = Math.random() * 1000
      const delay = baseDelay + jitter

      console.warn(
        `API request failed (attempt ${attempt}/${maxRetries}), retrying in ${delay}ms:`,
        error
      )
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  const origin = request.headers.get('origin')

  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    if (!rateLimiter.isAllowed(rateLimitKey)) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.',
          retryAfter: 60,
        },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': '60',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + 60000).toISOString(),
            ...getCORSHeaders(origin ?? undefined),
          },
        }
      )
    }

    // Check cache first
    const cachedData = cache.get(CACHE_KEY)
    if (cachedData) {
      const responseTime = Date.now() - startTime
      return NextResponse.json(cachedData, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'X-Cache-Status': 'HIT',
          'X-Response-Time': `${responseTime}ms`,
          'X-RateLimit-Remaining': rateLimiter
            .getRemainingRequests(rateLimitKey)
            .toString(),
          ...getCORSHeaders(origin ?? undefined),
        },
      })
    }

    // Fetch fresh data
    const data = await fetchWithRetry(3)

    // Cache successful response
    cache.set(CACHE_KEY, data, CACHE_TTL)

    const responseTime = Date.now() - startTime

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'X-Cache-Status': 'MISS',
        'X-Response-Time': `${responseTime}ms`,
        'X-RateLimit-Remaining': rateLimiter
          .getRemainingRequests(rateLimitKey)
          .toString(),
        ...getCORSHeaders(origin ?? undefined),
      },
    })
  } catch (error) {
    const responseTime = Date.now() - startTime

    console.error('API Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      url: request.url,
      userAgent: request.headers.get('user-agent'),
      rateLimitKey: getRateLimitKey(request),
    })

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        return NextResponse.json(
          {
            error: 'Gateway Timeout',
            message:
              'The service is taking too long to respond. Please try again.',
            code: 'TIMEOUT_ERROR',
          },
          {
            status: 504,
            headers: getCORSHeaders(origin ?? undefined),
          }
        )
      }

      if (error.message.includes('status: 429')) {
        return NextResponse.json(
          {
            error: 'External Rate Limit',
            message:
              'External service is rate limiting. Please try again later.',
            code: 'EXTERNAL_RATE_LIMIT',
          },
          {
            status: 429,
            headers: {
              'Retry-After': '300',
              ...getCORSHeaders(origin ?? undefined),
            },
          }
        )
      }
    }

    return NextResponse.json(
      {
        error: 'Service Unavailable',
        message: 'Unable to fetch player data. Please try again later.',
        code: 'SERVICE_ERROR',
      },
      {
        status: 503,
        headers: {
          'Retry-After': '60',
          ...getCORSHeaders(origin ?? undefined),
        },
      }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')

  return new NextResponse(null, {
    status: 200,
    headers: getCORSHeaders(origin ?? undefined),
  })
}

// Cleanup intervals
if (typeof globalThis !== 'undefined') {
  // Clean up cache and rate limiter every 5 minutes
  setInterval(
    () => {
      cache.cleanup()
      rateLimiter.cleanup()
    },
    5 * 60 * 1000
  )
}
