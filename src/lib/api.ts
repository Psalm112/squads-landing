import { PlayerCardData } from '@/types'
import { z } from 'zod'

// Validation schemas matching API response
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

export type ApiPlayer = z.infer<typeof ApiPlayerSchema>
export type ApiResponse = z.infer<typeof ApiResponseSchema>

// Custom error classes
export class ApiTimeoutError extends Error {
  constructor(
    message = 'Request timeout',
    public retryAfter?: number
  ) {
    super(message)
    this.name = 'ApiTimeoutError'
  }
}

export class ApiRateLimitError extends Error {
  constructor(
    message = 'Rate limit exceeded',
    public retryAfter?: number
  ) {
    super(message)
    this.name = 'ApiRateLimitError'
  }
}

export class ApiValidationError extends Error {
  constructor(
    message = 'Invalid API response',
    public details?: any
  ) {
    super(message)
    this.name = 'ApiValidationError'
    this.details = details
  }
}

export class ApiServiceError extends Error {
  constructor(
    message = 'Service error',
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiServiceError'
    this.status = status
    this.code = code
  }
}

// Enhanced transformation function
export const transformApiPlayerToCardData = (
  apiPlayer: ApiPlayer
): PlayerCardData | null => {
  try {
    // Validate required fields
    if (!apiPlayer.player?.id || !apiPlayer.player?.name) {
      console.warn('Invalid player data: missing required fields', {
        playerId: apiPlayer.player?.id,
        playerName: apiPlayer.player?.name,
      })
      return null
    }

    // Skip players with no available props
    const availableProps = apiPlayer.props.filter((prop) =>
      prop.lines.some((line) => line.isAvailable)
    )

    if (availableProps.length === 0) {
      return null
    }

    // Determine opponent team
    const isHomeTeam = apiPlayer.player.team.id === apiPlayer.game.homeTeam.id
    const opponent = isHomeTeam
      ? apiPlayer.game.awayTeam.nickname
      : apiPlayer.game.homeTeam.nickname

    const playerTeam = isHomeTeam
      ? apiPlayer.game.homeTeam.nickname
      : apiPlayer.game.awayTeam.nickname

    // Format game date
    const gameDate = new Date(apiPlayer.game.startDate)
    const formattedDate = gameDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'UTC',
    })

    // Get the main bet point (prefer NORMAL type, fallback to first available)
    const normalProp = apiPlayer.props.find((prop) => prop.type === 'NORMAL')
    const mainProp = normalProp || apiPlayer.props[0]
    const betPoints = mainProp?.betPoints ?? 0.5

    // Choose best available image
    const avatar =
      apiPlayer.player.imageUrl || apiPlayer.player.imageUrl128 || ''

    return {
      id: apiPlayer.player.id,
      name: apiPlayer.player.name,
      team: playerTeam,
      position: getPositionName(apiPlayer.player.position),
      match: opponent,
      date: formattedDate,
      stat: 'Shots on Target',
      value: formatBetPoints(betPoints),
      avatar: avatar,
      // Additional metadata for future use
      metadata: {
        gameId: apiPlayer.game.id,
        gameStatus: apiPlayer.game.status,
        isLive: apiPlayer.game.isLive,
        league: apiPlayer.game.league,
        sport: apiPlayer.sport,
        availableProps: availableProps.length,
        playerNumber: apiPlayer.player.number,
      },
    }
  } catch (error) {
    console.error('Error transforming player data:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      playerId: apiPlayer.player?.id,
      playerName: apiPlayer.player?.name,
    })
    return null
  }
}

// Utility functions
const getPositionName = (position: string): string => {
  const positionMap: Record<string, string> = {
    F: 'Forward',
    M: 'Midfielder',
    D: 'Defender',
    G: 'Goalkeeper',
    FW: 'Forward',
    MF: 'Midfielder',
    DF: 'Defender',
    GK: 'Goalkeeper',
  }
  return positionMap[position?.toUpperCase()] || 'Player'
}

const formatBetPoints = (points: number): string => {
  // Handle decimal formatting
  if (points % 1 === 0) {
    return points.toString()
  }
  return points.toFixed(1)
}

// Enhanced fetch function with better error handling
export const fetchPlayers = async (
  options: {
    timeout?: number
    retries?: number
  } = {}
): Promise<PlayerCardData[]> => {
  const { timeout = 15000, retries = 3 } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  let lastError: Error = new Error('Unknown error')

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch('/api/players', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Handle different status codes
      if (response.status === 429) {
        const errorData = await response.json().catch(() => ({}))
        const retryAfter = parseInt(response.headers.get('retry-after') || '60')
        throw new ApiRateLimitError(
          errorData.message || 'Too many requests. Please try again later.',
          retryAfter
        )
      }

      if (response.status === 504) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiTimeoutError(
          errorData.message || 'Service timeout. Please try again.'
        )
      }

      if (response.status === 503) {
        const errorData = await response.json().catch(() => ({}))
        const retryAfter = parseInt(response.headers.get('retry-after') || '60')
        throw new ApiServiceError(
          errorData.message || 'Service temporarily unavailable.',
          response.status,
          errorData.code
        )
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiServiceError(
          errorData.message || `HTTP error! status: ${response.status}`,
          response.status,
          errorData.code
        )
      }

      // Parse and validate response
      const rawData = await response.json()

      try {
        const validatedData = ApiResponseSchema.parse(rawData)

        // Transform players and filter out invalid ones
        const transformedPlayers = validatedData.props
          .map(transformApiPlayerToCardData)
          .filter((player): player is PlayerCardData => player !== null)

        console.log(
          `Successfully fetched ${transformedPlayers.length} players out of ${validatedData.props.length} total`
        )

        // Log cache status for debugging
        const cacheStatus = response.headers.get('x-cache-status')
        const responseTime = response.headers.get('x-response-time')

        if (process.env.NODE_ENV === 'development') {
          console.log(
            `API Response - Cache: ${cacheStatus}, Time: ${responseTime}`
          )
        }

        return transformedPlayers
      } catch (validationError) {
        if (validationError instanceof z.ZodError) {
          console.error(
            'API response validation failed:',
            validationError.errors
          )
          throw new ApiValidationError(
            'Invalid API response structure',
            validationError.errors
          )
        }
        throw validationError
      }
    } catch (error) {
      lastError = error as Error

      // Don't retry for these error types
      if (
        error instanceof ApiRateLimitError ||
        error instanceof ApiValidationError
      ) {
        throw error
      }

      // Don't retry on the last attempt
      if (attempt === retries) {
        break
      }

      // Exponential backoff with jitter
      const baseDelay = Math.min(1000 * Math.pow(2, attempt - 1), 10000)
      const jitter = Math.random() * 1000
      const delay = baseDelay + jitter

      console.warn(
        `Fetch attempt ${attempt}/${retries} failed, retrying in ${delay}ms:`,
        {
          error: error instanceof Error ? error.message : 'Unknown error',
          attempt,
          delay,
        }
      )

      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  clearTimeout(timeoutId)

  // Handle the final error
  if (lastError instanceof Error) {
    if (lastError.name === 'AbortError') {
      throw new ApiTimeoutError('Request was cancelled due to timeout')
    }

    console.error('Failed to fetch players after all retries:', {
      error: lastError.message,
      stack: lastError.stack,
      timestamp: new Date().toISOString(),
    })

    throw new ApiServiceError(`Failed to fetch players: ${lastError.message}`)
  }

  throw new ApiServiceError(
    'An unexpected error occurred while fetching players'
  )
}

// Health check function
export const checkApiHealth = async (): Promise<{
  healthy: boolean
  responseTime: number
  cacheStatus?: string
}> => {
  const startTime = Date.now()

  try {
    const response = await fetch('/api/players', {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    })

    const responseTime = Date.now() - startTime
    const cacheStatus = response.headers.get('x-cache-status')

    return {
      healthy: response.ok,
      responseTime,
      cacheStatus: cacheStatus || undefined,
    }
  } catch (error) {
    return {
      healthy: false,
      responseTime: Date.now() - startTime,
    }
  }
}

// Preload function for better UX
export const preloadPlayers = async (): Promise<void> => {
  try {
    // Use a lightweight HEAD request to warm up the cache
    await fetch('/api/players', {
      method: 'HEAD',
      headers: { 'Cache-Control': 'no-cache' },
    })
  } catch (error) {
    // Silently fail preload attempts
    console.debug('Preload failed:', error)
  }
}
