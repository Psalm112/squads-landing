import { useQuery } from '@tanstack/react-query'
import { fetchPlayers } from '@/lib/api'
import { useMemo, useState, useEffect } from 'react'
import { PlayerCardData } from '@/types'

// Main players query
export function usePlayersQuery() {
  return useQuery({
    queryKey: ['players', 'shots_on_target'],
    queryFn: fetchPlayers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Don't retry rate limit errors
      if (error instanceof Error && error.message.includes('Rate limited')) {
        return false
      }
      return failureCount < 2
    },
    retryDelay: (attemptIndex) =>
      Math.min(1000 * Math.pow(2, attemptIndex), 30000),
  })
}

// Random players hook - matches PlayerCard usage
export function useRandomPlayers(count: number = 3) {
  const [mounted, setMounted] = useState(false)
  const [seed, setSeed] = useState(0)

  const { data: players, ...query } = usePlayersQuery()

  useEffect(() => {
    setMounted(true)
    setSeed(Date.now()) // Initial seed
  }, [])

  // Stable random selection
  const randomPlayers = useMemo(() => {
    if (!mounted || !players?.length) return undefined

    // Simple seeded shuffle
    const shuffled = [...players].sort(() => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x) - 0.5
    })

    return shuffled.slice(0, Math.min(count, shuffled.length))
  }, [players, count, mounted, seed])

  const refreshSelection = () => setSeed(Date.now())

  return {
    ...query,
    data: randomPlayers,
    isLoading: query.isLoading || !mounted,
    isEmpty: mounted && !query.isLoading && !randomPlayers?.length,
    refreshSelection,
  }
}
