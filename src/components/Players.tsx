'use client'

import React, { useMemo, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import PlayerCard from './ui/PlayerCard'
import { usePlayersQuery } from '@/hooks/usePlayersQuery'
import { PlayerCardProps } from '@/types'

interface InfiniteScrollRowProps {
  players: PlayerCardProps['player'][]
  direction: 'left' | 'right'
  speed: number
  rowIndex: number
  highlightIndex?: number[]
}

const InfiniteScrollRow: React.FC<InfiniteScrollRowProps> = memo(
  ({ players, direction, speed, rowIndex, highlightIndex }) => {
    // Memoize duplicated players for seamless infinite scroll
    const duplicatedPlayers = useMemo(() => {
      if (!players || players.length === 0) return []
      // Create enough duplicates for smooth scrolling
      return [...players, ...players, ...players]
    }, [players])

    const cardVariants = useMemo(
      () => ({
        hidden: { opacity: 0, y: 20 },
        visible: (index: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.05, // Reduced delay for smoother staggering
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        }),
      }),
      []
    )

    // Memoize the animation configuration
    const animationConfig = useMemo(
      () => ({
        x: direction === 'left' ? ['0%', '-33.333%'] : ['-33.333%', '0%'],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop' as const,
            duration: speed,
            ease: 'linear' as const,
          },
        },
      }),
      [direction, speed]
    )

    if (!players || players.length === 0) {
      return null
    }

    return (
      <div
        className="relative overflow-hidden w-full"
        role="region"
        aria-label={`Player stats row ${rowIndex + 1}`}
      >
        <motion.div
          className="flex gap-4 will-change-transform py-2"
          animate={animationConfig.x}
          transition={animationConfig.transition}
        >
          {duplicatedPlayers.map((player, index) => {
            const originalIndex = index % players.length
            const isHighlighted = highlightIndex?.includes(originalIndex)

            return (
              <div key={`${player.id}-${index}`} className="flex-shrink-0">
                <PlayerCard
                  player={player}
                  variants={cardVariants}
                  isStandalone={false}
                  highlightCard={isHighlighted}
                />
              </div>
            )
          })}
        </motion.div>
      </div>
    )
  }
)

InfiniteScrollRow.displayName = 'InfiniteScrollRow'

const LoadingRow: React.FC<{ rowIndex: number }> = memo(({ rowIndex }) => (
  <div className="relative overflow-hidden w-full">
    <div className="flex gap-4">
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={`loading-${rowIndex}-${index}`}
          className="flex-shrink-0 bg-card-dark py-3 px-3 lg:px-4 rounded-xl border border-gray-700/30 animate-pulse"
        >
          <div className="flex items-start gap-2 sm:gap-3 w-full">
            <div className="mr-2 lg:mr-3 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-gray-600" />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 bg-gray-600 rounded w-3/4" />
              <div className="h-3 bg-gray-600 rounded w-1/2" />
              <div className="h-3 bg-gray-600 rounded w-2/3" />
            </div>
            <div className="w-12 h-16 sm:w-16 sm:h-20 lg:w-20 lg:h-24 bg-gray-600 rounded-lg" />
            <div className="flex flex-col gap-2 h-16 sm:h-20 lg:h-24">
              <div className="flex-1 w-16 bg-gray-600 rounded" />
              <div className="flex-1 w-16 bg-gray-600 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
))

LoadingRow.displayName = 'LoadingRow'

const ErrorRow: React.FC<{
  rowIndex: number
  onRetry?: () => void
  errorType?: string
}> = memo(({ rowIndex, onRetry, errorType }) => {
  const errorMessage = useMemo(() => {
    switch (errorType) {
      case 'rate-limit':
        return 'Rate limit exceeded'
      case 'timeout':
        return 'Request timed out'
      default:
        return 'Player data unavailable'
    }
  }, [errorType])

  return (
    <div className="relative overflow-hidden w-full">
      <div className="flex gap-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={`error-${rowIndex}-${index}`}
            className="flex-shrink-0 bg-card-dark py-3 px-3 lg:px-4 rounded-xl border border-gray-700/30"
          >
            <div className="flex flex-col items-center justify-center h-20 text-gray-400 text-sm space-y-2">
              <span>{errorMessage}</span>
              {index === 3 &&
                onRetry && ( // Show retry button on middle card
                  <button
                    onClick={onRetry}
                    className="text-xs text-light-green hover:text-light-green/80 transition-colors"
                  >
                    Retry
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

ErrorRow.displayName = 'ErrorRow'

const Players: React.FC = () => {
  const {
    data: players,
    isLoading,
    error,
    refetch,
    errorType,
  } = usePlayersQuery()

  // Generate stable highlight indices for consistent highlighting
  const highlightIndices = useMemo(() => {
    const indices: number[][] = []
    for (let i = 0; i < 4; i++) {
      // Generate 2 random indices for each row, ensuring they're different
      const rowIndices: number[] = []
      while (rowIndices.length < 2) {
        const randomIndex = Math.floor(Math.random() * 8)
        if (!rowIndices.includes(randomIndex)) {
          rowIndices.push(randomIndex)
        }
      }
      indices.push(rowIndices)
    }
    return indices
  }, []) // No dependencies - we want stable highlighting

  // Distribute first 32 players into 4 rows of 8, with intelligent fallback for fewer players
  const playerRows = useMemo(() => {
    if (!players || players.length === 0) return []

    const rows: PlayerCardProps['player'][][] = []

    if (players.length >= 32) {
      // Standard case: distribute first 32 players
      for (let i = 0; i < 4; i++) {
        const startIndex = i * 8
        const endIndex = startIndex + 8
        rows.push(players.slice(startIndex, endIndex))
      }
    } else {
      // Fallback for fewer players: distribute evenly and fill with duplicates
      const playersPerRow = Math.max(1, Math.floor(players.length / 4))
      const remainder = players.length % 4

      for (let i = 0; i < 4; i++) {
        const startIndex = i * playersPerRow + Math.min(i, remainder)
        const endIndex = startIndex + playersPerRow + (i < remainder ? 1 : 0)
        const rowPlayers = players.slice(startIndex, endIndex)

        // Fill to 8 players by cycling through available players
        while (rowPlayers.length < 8 && players.length > 0) {
          const fillIndex = rowPlayers.length % players.length
          rowPlayers.push(players[fillIndex])
        }

        rows.push(rowPlayers)
      }
    }

    return rows
  }, [players])

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15, // Slightly faster staggering
          delayChildren: 0.1,
        },
      },
    }),
    []
  )

  const rowVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    }),
    []
  )

  const handleRetry = useCallback(() => {
    refetch()
  }, [refetch])

  const renderRows = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 4 }, (_, rowIndex) => (
        <motion.div
          key={`loading-row-${rowIndex}`}
          variants={rowVariants}
          className="w-full"
        >
          <LoadingRow rowIndex={rowIndex} />
        </motion.div>
      ))
    }

    if (error || !players || players.length === 0) {
      return Array.from({ length: 4 }, (_, rowIndex) => (
        <motion.div
          key={`error-row-${rowIndex}`}
          variants={rowVariants}
          className="w-full"
        >
          <ErrorRow
            rowIndex={rowIndex}
            onRetry={handleRetry}
            errorType={errorType}
          />
        </motion.div>
      ))
    }

    return playerRows.map((rowPlayers, rowIndex) => (
      <motion.div
        key={`row-${rowIndex}`}
        variants={rowVariants}
        className="w-full"
      >
        <InfiniteScrollRow
          players={rowPlayers}
          direction={rowIndex % 2 === 0 ? 'left' : 'right'}
          speed={25 + rowIndex * 3} // Slightly faster base speed
          rowIndex={rowIndex}
          highlightIndex={highlightIndices[rowIndex]}
        />
      </motion.div>
    ))
  }, [
    isLoading,
    error,
    errorType,
    players,
    playerRows,
    rowVariants,
    handleRetry,
    highlightIndices,
  ])

  return (
    <section
      className="relative pb-24 bg-dark-navy overflow-hidden"
      aria-labelledby="players-section-title"
    >
      <div className="mx-auto">
        <h2 id="players-section-title" className="sr-only">
          Player Projections - Browse available player shot statistics for
          betting
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-4 sm:space-y-6 lg:space-y-8"
        >
          {renderRows()}
        </motion.div>
      </div>

      {/* Edge fade gradients */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-dark-navy to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-dark-navy to-transparent pointer-events-none z-10" />
    </section>
  )
}

export default memo(Players)
