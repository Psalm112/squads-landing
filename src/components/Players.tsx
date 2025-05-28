'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import PlayerCard from './ui/PlayerCard'
import { usePlayersQuery } from '@/hooks/usePlayersQuery'
import { PlayerCardProps } from '@/types'

const InfiniteScrollRow: React.FC<{
  players: PlayerCardProps['player'][]
  direction: 'left' | 'right'
  speed: number
  rowIndex: number
  highlightIndex?: number[]
}> = ({ players, direction, speed, rowIndex, highlightIndex }) => {
  // Duplicated players for seamless infinite scroll
  const duplicatedPlayers = useMemo(() => [...players, ...players], [players])

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  return (
    <div
      className="relative overflow-hidden w-full"
      role="region"
      aria-label={`Player stats row ${rowIndex + 1}`}
    >
      <motion.div
        className="flex gap-4 will-change-transform py-2"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {duplicatedPlayers.map((player, index) => (
          <div key={`${player.id}-${index}`} className="flex-shrink-0">
            <PlayerCard
              player={player}
              variants={cardVariants}
              isStandalone={false}
              highlightCard={
                highlightIndex &&
                highlightIndex.includes(index % players.length)
              }
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const LoadingRow: React.FC<{ rowIndex: number }> = ({ rowIndex }) => (
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
)

const ErrorRow: React.FC<{ rowIndex: number }> = ({ rowIndex }) => (
  <div className="relative overflow-hidden w-full">
    <div className="flex gap-4">
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={`error-${rowIndex}-${index}`}
          className="flex-shrink-0 bg-card-dark py-3 px-3 lg:px-4 rounded-xl border border-gray-700/30"
        >
          <div className="flex items-center justify-center h-20 text-gray-400 text-sm">
            Player data unavailable
          </div>
        </div>
      ))}
    </div>
  </div>
)

const Players: React.FC = () => {
  const { data: players, isLoading, error } = usePlayersQuery()

  // first 32 players into 4 rows of 8
  const playerRows = useMemo(() => {
    if (!players || players.length === 0) return []

    const first32Players = players.slice(0, 32)
    const rows: PlayerCardProps['player'][][] = []

    for (let i = 0; i < 4; i++) {
      const startIndex = i * 8
      const endIndex = startIndex + 8
      const rowPlayers = first32Players.slice(startIndex, endIndex)

      // Fill empty slots with duplicates if needed
      while (rowPlayers.length < 8 && first32Players.length > 0) {
        const fillIndex = rowPlayers.length % first32Players.length
        rowPlayers.push(first32Players[fillIndex])
      }

      rows.push(rowPlayers)
    }

    return rows
  }, [players])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const renderRows = () => {
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
          <ErrorRow rowIndex={rowIndex} />
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
          speed={30 + rowIndex * 5}
          rowIndex={rowIndex}
          highlightIndex={[
            Math.floor(Math.random() * 8),
            Math.floor(Math.random() * 8),
          ]}
        />
      </motion.div>
    ))
  }

  return (
    <section
      className="relative pb-24 bg-dark-navy overflow-hidden"
      aria-labelledby="players-section-title"
    >
      <div className="mx-auto">
        <h2 id="players-section-title" className="sr-only">
          Player Projections - Browse available player statistics for betting
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

      {/* Edge fade */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-dark-navy to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-dark-navy to-transparent pointer-events-none z-10" />
    </section>
  )
}

export default Players
