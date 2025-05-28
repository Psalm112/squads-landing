import { useQuery } from '@tanstack/react-query'
import { fetchPlayers } from '@/lib/api'
import { useMemo, useState } from 'react'
import { useEffect } from 'react'

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
  const [mounted, setMounted] = useState(false)
  const { data: players, ...queryResult } = usePlayersQuery()

  useEffect(() => {
    setMounted(true)
  }, [])

  const randomPlayers = useMemo(() => {
    if (!mounted || !players) return undefined
    return [...players].sort(() => Math.random() - 0.5).slice(0, count)
  }, [players, count, mounted])

  return {
    ...queryResult,
    data: randomPlayers,
    isLoading: queryResult.isLoading || !mounted,
  }
}
