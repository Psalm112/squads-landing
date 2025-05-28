import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchPlayers, ApiRateLimitError, ApiTimeoutError } from '@/lib/api'
import { useMemo, useState, useEffect, useCallback } from 'react'
import { PlayerCardData } from '@/types'

export const usePlayersQuery = () => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['players', 'shots_on_target'],
    queryFn: async () => {
      try {
        return await fetchPlayers()
      } catch (error) {
        if (error instanceof ApiRateLimitError) {
          throw error
        }
        if (error instanceof ApiTimeoutError) {
          throw error
        }
        throw error
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
    retry: (failureCount, error) => {
      if (error instanceof ApiRateLimitError) {
        return false
      }
      if (error instanceof ApiTimeoutError) {
        return failureCount < 2
      }
      return failureCount < 3
    },
    retryDelay: (attemptIndex, error) => {
      // Exponential backoff with jitter
      const baseDelay = Math.min(1000 * Math.pow(2, attemptIndex), 10000)
      const jitter = Math.random() * 1000

      // Longer delay for rate limit errors
      if (error instanceof ApiRateLimitError) {
        return 60000 + jitter // 1 minute + jitter
      }

      return baseDelay + jitter
    },
    // background refetch
    refetchInterval: (data, query) => {
      if (data && !query.state.error) {
        return 10 * 60 * 1000 // 10 minutes
      }
      return false
    },
    meta: {
      errorMessage: 'Failed to load player data',
    },
  })
}

export const useRandomPlayers = (count: number = 3) => {
  const [mounted, setMounted] = useState(false)
  const [seed, setSeed] = useState(0)
  const queryClient = useQueryClient()

  const query = usePlayersQuery()
  const { data: players, error, isLoading, isError } = query

  useEffect(() => {
    setMounted(true)
  }, [])

  //  refresh random selection
  const refreshRandomSelection = useCallback(() => {
    setSeed((prev) => prev + 1)
  }, [])

  // random selection
  const randomPlayers = useMemo(() => {
    if (!mounted || !players || players.length === 0) return undefined

    // seeded random function for consistent results until refresh
    const seededRandom = (seed: number) => {
      let x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    // Shuffled array with seeded randomness
    const shuffled = [...players].sort(
      () => seededRandom(seed + Math.random()) - 0.5
    )
    return shuffled.slice(0, Math.min(count, shuffled.length))
  }, [players, count, mounted, seed])

  // Prefetch
  useEffect(() => {
    if (players && players.length > 0) {
      queryClient.prefetchQuery({
        queryKey: ['players', 'featured'],
        queryFn: () => Promise.resolve(players.slice(0, 10)),
        staleTime: 10 * 60 * 1000,
      })
    }
  }, [players, queryClient])

  return {
    ...query,
    data: randomPlayers,
    isLoading: isLoading || !mounted,
    isEmpty:
      mounted && !isLoading && (!randomPlayers || randomPlayers.length === 0),
    refreshRandomSelection,
    // error information
    errorType:
      error instanceof ApiRateLimitError
        ? 'rate-limit'
        : error instanceof ApiTimeoutError
          ? 'timeout'
          : isError
            ? 'generic'
            : null,
    // Retry function for manual retry
    retry: () => query.refetch(),
  }
}

// monitoring API performance
export const useApiPerformance = () => {
  const [metrics, setMetrics] = useState({
    lastFetchTime: 0,
    averageResponseTime: 0,
    successRate: 100,
    totalRequests: 0,
  })

  const updateMetrics = useCallback(
    (responseTime: number, success: boolean) => {
      setMetrics((prev) => {
        const newTotalRequests = prev.totalRequests + 1
        const newAverageResponseTime =
          (prev.averageResponseTime * prev.totalRequests + responseTime) /
          newTotalRequests
        const newSuccessRate =
          (((prev.successRate * prev.totalRequests) / 100 + (success ? 1 : 0)) /
            newTotalRequests) *
          100

        return {
          lastFetchTime: responseTime,
          averageResponseTime: newAverageResponseTime,
          successRate: newSuccessRate,
          totalRequests: newTotalRequests,
        }
      })
    },
    []
  )

  return { metrics, updateMetrics }
}

// handling offline/online state
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true)
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      // Refetch stale queries when coming back online
      queryClient.refetchQueries({
        type: 'active',
        stale: true,
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [queryClient])

  return isOnline
}
