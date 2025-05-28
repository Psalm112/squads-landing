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

export const transformApiPlayerToCardData = (
  apiPlayer: ApiPlayer
): PlayerCardData => {
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
    avatar: apiPlayer.player.imageUrl || '',
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
  try {
    const response = await fetch(
      'https://api.squads.game/bet/public-props?marketType=player_shots_on_target',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: ApiResponse = await response.json()
    return data.props.map(transformApiPlayerToCardData)
  } catch (error) {
    console.error('Failed to fetch players:', error)
    throw new Error('Failed to fetch players data')
  }
}
