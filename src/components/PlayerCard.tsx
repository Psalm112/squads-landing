'use client'

import { motion } from 'framer-motion'
import { memo, useState, useCallback } from 'react'
import { BettingCard } from '@/types'
import { accessibilityUtils } from '@/utils/accessibility'

interface PlayerCardProps {
  player: BettingCard
  index: number
  isVisible: boolean
  onMoreClick?: (playerId: number) => void
  onLessClick?: (playerId: number) => void
}

const PlayerCardComponent = ({
  player,
  index,
  isVisible,
  onMoreClick,
  onLessClick,
}: PlayerCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [buttonStates, setButtonStates] = useState({
    more: false,
    less: false,
  })

  const handleMoreClick = useCallback(() => {
    setButtonStates((prev) => ({ ...prev, more: true }))
    onMoreClick?.(player.id)
    accessibilityUtils.announceToScreenReader(
      `Selected MORE for ${player.name} at ${player.stat}`
    )

    // Reset button state after animation
    setTimeout(() => {
      setButtonStates((prev) => ({ ...prev, more: false }))
    }, 200)
  }, [player.id, player.name, player.stat, onMoreClick])

  const handleLessClick = useCallback(() => {
    setButtonStates((prev) => ({ ...prev, less: true }))
    onLessClick?.(player.id)
    accessibilityUtils.announceToScreenReader(
      `Selected LESS for ${player.name} at ${player.stat}`
    )

    // Reset button state after animation
    setTimeout(() => {
      setButtonStates((prev) => ({ ...prev, less: false }))
    }, 200)
  }, [player.id, player.name, player.stat, onLessClick])

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      rotateY: -15,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  }

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="
        bg-card-dark text-white rounded-2xl sm:rounded-3xl 
        p-4 sm:p-6 shadow-xl
        transform transition-all duration-300
        will-change-transform
        focus-within:ring-2 focus-within:ring-brand-cyan focus-within:ring-offset-2
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transition: { duration: 0.2 },
      }}
      role="article"
      aria-labelledby={`player-${player.id}-name`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
          {/* Player Avatar */}
          <motion.div
            className="
              w-12 h-12 sm:w-16 sm:h-16 
              bg-gradient-to-br from-brand-cyan via-brand-purple to-brand-pink 
              rounded-full flex-shrink-0
              flex items-center justify-center text-white font-bold
              relative overflow-hidden
            "
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            {player.image ? (
              <img
                src={player.image}
                alt={`${player.name} profile`}
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            ) : (
              <span className="text-lg sm:text-xl">
                {player.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
            )}
          </motion.div>

          {/* Player Info */}
          <div className="min-w-0 flex-1">
            <h3
              id={`player-${player.id}-name`}
              className="font-bold text-sm sm:text-base text-white truncate"
            >
              {player.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 truncate">
              {player.position}
            </p>
            <p className="text-xs text-gray-400 truncate">{player.team}</p>
          </div>
        </div>

        {/* Betting Controls */}
        <div className="text-right flex-shrink-0 ml-4">
          <motion.div
            className="text-2xl sm:text-3xl font-bold text-white mb-2"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {player.stat}
          </motion.div>

          <div
            className="flex gap-2"
            role="group"
            aria-label={`Betting options for ${player.name}`}
          >
            <motion.button
              className="
                btn-primary text-xs sm:text-sm px-3 py-1.5 
                bg-brand-lime hover:bg-brand-lime/90
                relative overflow-hidden
                focus:ring-2 focus:ring-brand-lime focus:ring-offset-2 focus:ring-offset-card-dark
              "
              onClick={handleMoreClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={
                buttonStates.more
                  ? {
                      boxShadow: '0 0 20px rgba(139, 195, 74, 0.6)',
                    }
                  : {}
              }
              aria-label={`Pick more than ${player.stat} for ${player.name}`}
              type="button"
            >
              <span className="relative z-10">More ↑</span>
              {buttonStates.more && (
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </motion.button>

            <motion.button
              className="
                btn-secondary text-xs sm:text-sm px-3 py-1.5
                relative overflow-hidden
                focus:ring-2 focus:ring-brand-pink focus:ring-offset-2 focus:ring-offset-card-dark
              "
              onClick={handleLessClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={
                buttonStates.less
                  ? {
                      boxShadow: '0 0 20px rgba(255, 105, 180, 0.6)',
                    }
                  : {}
              }
              aria-label={`Pick less than ${player.stat} for ${player.name}`}
              type="button"
            >
              <span className="relative z-10">Less ↓</span>
              {buttonStates.less && (
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export const PlayerCard = memo(PlayerCardComponent)
