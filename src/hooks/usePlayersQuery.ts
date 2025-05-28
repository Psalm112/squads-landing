import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import {
  fetchPlayers,
  checkApiHealth,
  preloadPlayers,
  ApiRateLimitError,
  ApiTimeoutError,
  ApiServiceError,
  ApiValidationError,
} from '@/lib/api'
import { useMemo, useState, useEffect, useCallback, useRef } from 'react'
import { PlayerCardData } from '@/types'

// Query keys
export const QUERY_KEYS = {
  players: ['players'] as const,
  playersShots: ['players', 'shots_on_target'] as const,
  playersFeatured: ['players', 'featured'] as const,
  apiHealth: ['api', 'health'] as const,
} as const

// Enhanced players query hook
export const usePlayersQuery = (
  options: {
    enabled?: boolean
    refetchInterval?: number
  } = {}
) => {
  const { enabled = true, refetchInterval } = options
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: QUERY_KEYS.playersShots,
    queryFn: async () => {
      try {
        return await fetchPlayers({ timeout: 15000, retries: 3 })
      } catch (error) {
        // Re-throw custom errors to preserve their type
        if (
          error instanceof ApiRateLimitError ||
          error instanceof ApiTimeoutError ||
          error instanceof ApiServiceError ||
          error instanceof ApiValidationError
        ) {
          throw error
        }
        throw error
      }
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (was cacheTime)
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,

    // Smart retry logic
    retry: (failureCount, error) => {
      // Don't retry rate limit errors
      if (error instanceof ApiRateLimitError) {
        return false
      }

      // Limited retries for timeout errors
      if (error instanceof ApiTimeoutError) {
        return failureCount < 2
      }

      // Don't retry validation errors
      if (error instanceof ApiValidationError) {
        return false
      }

      // Standard retry for other errors
      return failureCount < 3
    },

    retryDelay: (attemptIndex, error) => {
      // Exponential backoff with jitter
      const baseDelay = Math.min(1000 * Math.pow(2, attemptIndex), 30000)
      const jitter = Math.random() * 1000

      // Longer delay for rate limit errors
      if (error instanceof ApiRateLimitError) {
        const retryAfter = error.retryAfter || 60
        return retryAfter * 1000 + jitter
      }

      // Shorter delay for timeout errors
      if (error instanceof ApiTimeoutError) {
        return Math.min(5000, baseDelay) + jitter
      }

      return baseDelay + jitter
    },

    // Background refetch with smart intervals
    refetchInterval: (query) => {
      const data = query.state.data
      const error = query.state.error
      if (refetchInterval) return refetchInterval
      if (error) return false
      if (data && Array.isArray(data) && data.length < 10) return 5 * 60 * 1000
      if (data && !error) return 10 * 60 * 1000

      return false
    },

    // Error boundary integration
    throwOnError: false,

    meta: {
      errorMessage: 'Failed to load player data',
    },
  })
}

// Enhanced random players hook (continued)
export const useRandomPlayers = (
  count: number = 3,
  options: {
    autoRefresh?: boolean
    refreshInterval?: number
  } = {}
) => {
  const { autoRefresh = false, refreshInterval = 30000 } = options
  const [mounted, setMounted] = useState(false)
  const [seed, setSeed] = useState(() => Math.random())
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const query = usePlayersQuery()
  const { data: players, error, isLoading, isError } = query

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto refresh logic
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      refreshIntervalRef.current = setInterval(() => {
        setSeed(Math.random())
      }, refreshInterval)

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current)
        }
      }
    }
  }, [autoRefresh, refreshInterval])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
      }
    }
  }, [])

  // Manual refresh function
  const refreshRandomSelection = useCallback(() => {
    setSeed(Math.random())
  }, [])

  // Stable random selection with Fisher-Yates shuffle
  const randomPlayers = useMemo(() => {
    if (!mounted || !players || players.length === 0) return undefined

    // Create a seeded random function for consistent results
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    // Fisher-Yates shuffle with seeded randomness
    const shuffled = [...players]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(seed + i) * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled.slice(0, Math.min(count, shuffled.length))
  }, [players, count, mounted, seed])

  // Enhanced error classification
  const errorInfo = useMemo(() => {
    if (!error) return null

    if (error instanceof ApiRateLimitError) {
      return {
        type: 'rate-limit' as const,
        message: 'Too many requests. Please wait before trying again.',
        retryAfter: error.retryAfter || 60,
        recoverable: true,
      }
    }

    if (error instanceof ApiTimeoutError) {
      return {
        type: 'timeout' as const,
        message: 'Request timed out. Please check your connection.',
        recoverable: true,
      }
    }

    if (error instanceof ApiValidationError) {
      return {
        type: 'validation' as const,
        message: 'Invalid data received. Please try refreshing.',
        recoverable: false,
      }
    }

    if (error instanceof ApiServiceError) {
      return {
        type: 'service' as const,
        message: error.message,
        status: error.status,
        code: error.code,
        recoverable: error.status !== 404,
      }
    }

    return {
      type: 'unknown' as const,
      message: 'An unexpected error occurred.',
      recoverable: true,
    }
  }, [error])

  return {
    ...query,
    data: randomPlayers,
    isLoading: isLoading || !mounted,
    isEmpty:
      mounted && !isLoading && (!randomPlayers || randomPlayers.length === 0),
    hasData: mounted && !isLoading && randomPlayers && randomPlayers.length > 0,
    refreshRandomSelection,
    errorInfo,
    // Enhanced retry function
    retry: () => {
      if (errorInfo?.recoverable) {
        return query.refetch()
      }
      return Promise.resolve()
    },
  }
}

// API health monitoring hook
export const useApiHealth = () => {
  const [isOnline, setIsOnline] = useState(true)

  const healthQuery = useQuery({
    queryKey: QUERY_KEYS.apiHealth,
    queryFn: checkApiHealth,
    refetchInterval: 30000, // Check every 30 seconds
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 10000, // 10 seconds
  })

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const isHealthy = healthQuery.data?.healthy && isOnline
  const avgResponseTime = healthQuery.data?.responseTime || 0

  return {
    isHealthy,
    isOnline,
    responseTime: avgResponseTime,
    cacheStatus: healthQuery.data?.cacheStatus,
    isChecking: healthQuery.isLoading,
    lastCheck: healthQuery.dataUpdatedAt,
    checkHealth: () => healthQuery.refetch(),
  }
}

// Performance monitoring hook
export const useApiPerformance = () => {
  const [metrics, setMetrics] = useState({
    requests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    totalResponseTime: 0,
    avgResponseTime: 0,
    successRate: 100,
    lastRequestTime: 0,
    cacheHitRate: 0,
    cacheHits: 0,
    cacheMisses: 0,
  })

  const updateMetrics = useCallback(
    (responseTime: number, success: boolean, fromCache: boolean = false) => {
      setMetrics((prev) => {
        const newRequests = prev.requests + 1
        const newSuccessful = prev.successfulRequests + (success ? 1 : 0)
        const newFailed = prev.failedRequests + (success ? 0 : 1)
        const newTotalResponseTime = prev.totalResponseTime + responseTime
        const newAvgResponseTime = newTotalResponseTime / newRequests
        const newSuccessRate = (newSuccessful / newRequests) * 100
        const newCacheHits = prev.cacheHits + (fromCache ? 1 : 0)
        const newCacheMisses = prev.cacheMisses + (fromCache ? 0 : 1)
        const newCacheHitRate =
          (newCacheHits / (newCacheHits + newCacheMisses)) * 100

        return {
          requests: newRequests,
          successfulRequests: newSuccessful,
          failedRequests: newFailed,
          totalResponseTime: newTotalResponseTime,
          avgResponseTime: newAvgResponseTime,
          successRate: newSuccessRate,
          lastRequestTime: responseTime,
          cacheHitRate: newCacheHitRate,
          cacheHits: newCacheHits,
          cacheMisses: newCacheMisses,
        }
      })
    },
    []
  )

  const resetMetrics = useCallback(() => {
    setMetrics({
      requests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      totalResponseTime: 0,
      avgResponseTime: 0,
      successRate: 100,
      lastRequestTime: 0,
      cacheHitRate: 0,
      cacheHits: 0,
      cacheMisses: 0,
    })
  }, [])

  return {
    metrics,
    updateMetrics,
    resetMetrics,
    getReport: () => ({
      ...metrics,
      status:
        metrics.successRate > 95
          ? 'excellent'
          : metrics.successRate > 90
            ? 'good'
            : metrics.successRate > 80
              ? 'fair'
              : 'poor',
    }),
  }
}

// Network status monitoring
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )
  const [connectionType, setConnectionType] = useState<string>('unknown')
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

    const handleConnectionChange = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        setConnectionType(connection?.effectiveType || 'unknown')
      }
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    if ('connection' in navigator) {
      ;(navigator as any).connection?.addEventListener(
        'change',
        handleConnectionChange
      )
      handleConnectionChange() // Set initial value
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      if ('connection' in navigator) {
        ;(navigator as any).connection?.removeEventListener(
          'change',
          handleConnectionChange
        )
      }
    }
  }, [queryClient])

  return {
    isOnline,
    connectionType,
    isSlowConnection: connectionType === 'slow-2g' || connectionType === '2g',
    isFastConnection: connectionType === '4g' || connectionType === '5g',
  }
}

// Preload hook for better UX
export const usePreloadPlayers = () => {
  const queryClient = useQueryClient()

  const preloadMutation = useMutation({
    mutationFn: preloadPlayers,
    onSuccess: () => {
      // Invalidate queries to trigger a fresh fetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.playersShots })
    },
  })

  return {
    preload: preloadMutation.mutate,
    isPreloading: preloadMutation.isPending,
    preloadError: preloadMutation.error,
  }
}
