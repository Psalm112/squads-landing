import { useQuery } from '@tanstack/react-query'
import { fetchPlayers } from '@/lib/api'

export const usePlayersQuery = () => {
  return useQuery({
    queryKey: ['players', 'shots_on_target'],
    queryFn: fetchPlayers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const useRandomPlayers = (count: number = 3) => {
  const { data: players, ...queryResult } = usePlayersQuery()

  const randomPlayers = players
    ? [...players].sort(() => 0.5 - Math.random()).slice(0, count)
    : undefined

  return {
    ...queryResult,
    data: randomPlayers,
  }
}
