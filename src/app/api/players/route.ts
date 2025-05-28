import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory cache
const cache = new Map<string, { data: any; expires: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// Rate limiting - simple sliding window
const requests = new Map<string, number[]>()
const RATE_LIMIT = { requests: 60, window: 60 * 1000 }

function getClientId(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'default'
  )
}

function isRateLimited(clientId: string): boolean {
  const now = Date.now()
  const clientRequests = requests.get(clientId) || []

  // Clean old requests
  const validRequests = clientRequests.filter(
    (time) => now - time < RATE_LIMIT.window
  )

  if (validRequests.length >= RATE_LIMIT.requests) {
    return true
  }

  validRequests.push(now)
  requests.set(clientId, validRequests)
  return false
}

function getCachedData(key: string) {
  const cached = cache.get(key)
  if (cached && Date.now() < cached.expires) {
    return cached.data
  }
  cache.delete(key)
  return null
}

function setCachedData(key: string, data: any) {
  cache.set(key, { data, expires: Date.now() + CACHE_TTL })
}

async function fetchPlayersData() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(
      'https://api.squads.game/bet/public-props?marketType=player_shots_on_target',
      {
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Squads-Landing/1.0',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } finally {
    clearTimeout(timeout)
  }
}

export async function GET(request: NextRequest) {
  const clientId = getClientId(request)

  // Rate limiting
  if (isRateLimited(clientId)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  // Check cache
  const cached = getCachedData('players')
  if (cached) {
    return NextResponse.json(cached, {
      headers: { 'X-Cache': 'HIT' },
    })
  }

  try {
    const data = await fetchPlayersData()
    setCachedData('players', data)

    return NextResponse.json(data, {
      headers: { 'X-Cache': 'MISS' },
    })
  } catch (error) {
    console.error('API Error:', error)

    return NextResponse.json(
      { error: 'Service unavailable' },
      { status: 503, headers: { 'Retry-After': '60' } }
    )
  }
}
