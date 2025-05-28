import { PlayerCardData } from '@/types'

export interface ApiPlayer {
  groupId: string
  player: {
    id: string
    name: string
    imageUrl: string
    imageUrl128: string
    position: string
    team: {
      id: string
    }
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
  market: {
    id: string
    name: string
  }
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

export interface ApiResponse {
  props: ApiPlayer[]
  pagination: {
    page: number
    size: number
    totalCount: number
    lastPage: number
  }
}

export interface ApiError {
  error: string
  message: string
  status?: number
}

// Custom error classes for better error handling
export class ApiTimeoutError extends Error {
  constructor(message = 'Request timeout') {
    super(message)
    this.name = 'ApiTimeoutError'
  }
}

export class ApiRateLimitError extends Error {
  constructor(message = 'Rate limit exceeded') {
    super(message)
    this.name = 'ApiRateLimitError'
  }
}

export class ApiValidationError extends Error {
  constructor(message = 'Invalid API response') {
    super(message)
    this.name = 'ApiValidationError'
  }
}

export const transformApiPlayerToCardData = (
  apiPlayer: ApiPlayer
): PlayerCardData | null => {
  try {
    // Validate required fields
    if (!apiPlayer.player?.id || !apiPlayer.player?.name) {
      console.warn('Invalid player data: missing required fields', apiPlayer)
      return null
    }

    const opponent =
      apiPlayer.player.team.id === apiPlayer.game.homeTeam.id
        ? apiPlayer.game.awayTeam.nickname
        : apiPlayer.game.homeTeam.nickname

    const gameDate = new Date(apiPlayer.game.startDate).toLocaleDateString(
      'en-US',
      {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }
    )

    // Get the main bet point (NORMAL type)
    const normalProp = apiPlayer.props.find((prop) => prop.type === 'NORMAL')
    const betPoints = normalProp?.betPoints || 0.5

    return {
      id: apiPlayer.player.id,
      name: apiPlayer.player.name,
      team:
        apiPlayer.game.homeTeam.id === apiPlayer.player.team.id
          ? apiPlayer.game.homeTeam.nickname
          : apiPlayer.game.awayTeam.nickname,
      position: getPositionName(apiPlayer.player.position),
      match: opponent,
      date: gameDate,
      stat: 'Shots on Target',
      value: betPoints.toString(),
      avatar: apiPlayer.player.imageUrl || apiPlayer.player.imageUrl128 || '',
    }
  } catch (error) {
    console.error('Error transforming player data:', error, apiPlayer)
    return null
  }
}

const getPositionName = (position: string): string => {
  const positionMap: Record<string, string> = {
    F: 'Forward',
    M: 'Midfielder',
    D: 'Defender',
    G: 'Goalkeeper',
  }
  return positionMap[position] || 'Player'
}

export const fetchPlayers = async (): Promise<PlayerCardData[]> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout for client

  try {
    const response = await fetch('/api/players', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    // Handle different HTTP status codes
    if (response.status === 429) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiRateLimitError(
        errorData.message || 'Too many requests. Please try again later.'
      )
    }

    if (response.status === 504 || response.status === 503) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiTimeoutError(
        errorData.message ||
          'Service temporarily unavailable. Please try again.'
      )
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      )
    }

    const data: ApiResponse = await response.json()

    // Validate response structure
    if (!data.props || !Array.isArray(data.props)) {
      throw new ApiValidationError('Invalid API response structure')
    }

    // Transform and filter out invalid players
    const transformedPlayers = data.props
      .map(transformApiPlayerToCardData)
      .filter((player): player is PlayerCardData => player !== null)

    console.log(`Successfully fetched ${transformedPlayers.length} players`)

    return transformedPlayers
  } catch (error) {
    clearTimeout(timeoutId)

    if (
      error instanceof ApiRateLimitError ||
      error instanceof ApiTimeoutError
    ) {
      throw error
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiTimeoutError('Request was cancelled due to timeout')
      }

      console.error('Failed to fetch players:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      })

      throw new Error(`Failed to fetch players: ${error.message}`)
    }

    throw new Error('An unexpected error occurred while fetching players')
  }
}

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/players', {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })
    return response.ok
  } catch {
    return false
  }
}
