import { PlayerCardData } from '@/types'

interface ApiPlayer {
  player: {
    id: string
    name: string
    imageUrl?: string
    position: string
    team: { id: string }
    number?: string | null
  }
  game: {
    isLive: boolean
    startDate: string
    homeTeam: { id: string; nickname: string }
    awayTeam: { id: string; nickname: string }
  }
  props: Array<{
    betPoints: number
    lines: Array<{ isAvailable: boolean }>
  }>
}

interface ApiResponse {
  props: ApiPlayer[]
}

// Transform API data to PlayerCard format
function transformPlayer(apiPlayer: ApiPlayer): PlayerCardData | null {
  try {
    // Basic validation
    if (!apiPlayer?.player?.id || !apiPlayer?.player?.name) {
      return null
    }

    // Skip if no available props
    const hasAvailableProps = apiPlayer.props?.some((prop) =>
      prop.lines?.some((line) => line.isAvailable)
    )
    if (!hasAvailableProps) return null

    // Determine opponent
    const isHome = apiPlayer.player.team.id === apiPlayer.game.homeTeam.id
    const opponent = isHome
      ? apiPlayer.game.awayTeam.nickname
      : apiPlayer.game.homeTeam.nickname
    const team = isHome
      ? apiPlayer.game.homeTeam.nickname
      : apiPlayer.game.awayTeam.nickname

    // Format date
    const date = new Date(apiPlayer.game.startDate).toLocaleDateString(
      'en-US',
      {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }
    )

    // Get bet points
    const betPoints = apiPlayer.props[0]?.betPoints ?? 0.5

    return {
      id: apiPlayer.player.id,
      name: apiPlayer.player.name,
      team: team || 'Unknown',
      position: formatPosition(apiPlayer.player.position),
      match: opponent || 'TBD',
      date,
      stat: 'Shots on Target',
      value: betPoints % 1 === 0 ? betPoints.toString() : betPoints.toFixed(1),
      avatar: apiPlayer.player.imageUrl || '',
      metadata: {
        gameId: `${apiPlayer.game.homeTeam.id}-${apiPlayer.game.awayTeam.id}`,
        gameStatus: 'scheduled',
        isLive: apiPlayer.game.isLive,
        league: 'Premier League',
        sport: 'football',
        availableProps: apiPlayer.props?.length || 0,
        playerNumber: apiPlayer.player.number || null,
      },
    }
  } catch (error) {
    console.warn('Failed to transform player:', error)
    return null
  }
}

function formatPosition(pos: string): string {
  if (!pos) return 'Player'

  const positions: Record<string, string> = {
    F: 'Forward',
    M: 'Midfielder',
    D: 'Defender',
    G: 'Goalkeeper',
    FW: 'Forward',
    MF: 'Midfielder',
    DF: 'Defender',
    GK: 'Goalkeeper',
  }
  return positions[pos.toUpperCase()] || 'Player'
}

// Main fetch function with retry logic
export async function fetchPlayers(): Promise<PlayerCardData[]> {
  let lastError: Error

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch('/api/players', {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(15000),
      })

      if (response.status === 429) {
        throw new Error('Rate limited')
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data: ApiResponse = await response.json()

      // Basic structure check
      if (!data?.props || !Array.isArray(data.props)) {
        throw new Error('Invalid API response structure')
      }

      return data.props
        .map(transformPlayer)
        .filter((player): player is PlayerCardData => player !== null)
    } catch (error) {
      lastError = error as Error

      if (
        attempt === 3 ||
        (error instanceof Error && error.message === 'Rate limited')
      ) {
        break
      }

      // Exponential backoff
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}
