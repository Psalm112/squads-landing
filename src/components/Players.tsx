'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import PlayerCard from './ui/PlayerCard'
import { PlayerCardProps } from '@/types'

// Mock data - replace with API call in the future
const generateMockPlayers = (count: number): PlayerCardProps['player'][] => {
  const names = [
    'Erling Haaland',
    'Kevin De Bruyne',
    'Bernardo Silva',
    'Jack Grealish',
    'Riyad Mahrez',
    'Phil Foden',
  ]
  const teams = [
    'Manchester City',
    'Liverpool',
    'Arsenal',
    'Chelsea',
    'Tottenham',
    'Manchester United',
  ]
  const positions = ['Forward', 'Midfielder', 'Defender', 'Goalkeeper']
  const stats = [
    'Shots on Target',
    'Goals',
    'Assists',
    'Saves',
    'Passes',
    'Tackles',
  ]
  const opponents = [
    'Arsenal',
    'Liverpool',
    'Chelsea',
    'Tottenham',
    'Newcastle',
    'Brighton',
  ]

  return Array.from({ length: count }, (_, index) => ({
    id: `player-${index}`,
    name: names[index % names.length],
    team: teams[index % teams.length],
    position: positions[index % positions.length],
    match: opponents[index % opponents.length],
    date: '3rd Mar 11:20 PM',
    value: (2.5 + Math.random() * 2).toFixed(1),
    stat: stats[index % stats.length],
    avatar: '/assets/onana.jpg',
  }))
}

const InfiniteScrollRow: React.FC<{
  players: PlayerCardProps['player'][]
  direction: 'left' | 'right'
  speed: number
  rowIndex: number
}> = ({ players, direction, speed, rowIndex }) => {
  // Duplicate players for seamless infinite scroll
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
        className="flex gap-4 will-change-transform"
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
        // style={{
        //   width: `${duplicatedPlayers.length * 320}px`, // Approximate card width including gap
        // }}
      >
        {duplicatedPlayers.map((player, index) => (
          <div key={`${player.id}-${index}`} className="flex-shrink-0">
            <PlayerCard
              player={player}
              index={index}
              variants={cardVariants}
              isStandalone={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const Players: React.FC = () => {
  const playerRows = useMemo(
    () => [
      generateMockPlayers(8),
      generateMockPlayers(8),
      generateMockPlayers(8),
      generateMockPlayers(8),
    ],
    []
  )

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

  return (
    <section
      className="relative pb-24 bg-dark-navy overflow-hidden"
      aria-labelledby="players-section-title"
    >
      <div className="mx-auto">
        {/* Screen reader title */}
        <h2 id="players-section-title" className="sr-only">
          Player Projections - Browse available player statistics for betting
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-6 sm:space-y-8 lg:space-y-10"
        >
          {playerRows.map((players, rowIndex) => (
            <motion.div
              key={`row-${rowIndex}`}
              variants={rowVariants}
              className="w-full"
            >
              <InfiniteScrollRow
                players={players}
                direction={rowIndex % 2 === 0 ? 'left' : 'right'}
                speed={30 + rowIndex * 5} // Varying speeds for visual interest
                rowIndex={rowIndex}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gradient overlays for smooth edge fade effect */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-dark-navy to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-dark-navy to-transparent pointer-events-none z-10" />
    </section>
  )
}

export default Players
