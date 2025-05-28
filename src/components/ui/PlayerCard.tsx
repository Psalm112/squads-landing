'use client'

import { PlayerCardProps } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { IoArrowDown, IoArrowUp, IoTimer, IoFootball } from 'react-icons/io5'
import { RxAvatar } from 'react-icons/rx'
import { useState, useCallback, memo } from 'react'

// Memoized component for better performance
const PlayerCard = memo(function PlayerCard({
  player,
  variants,
  isStandalone = true,
  highlightMore = false,
  highlightLess = false,
  highlightCard = false,
  onBetClick,
  isLoading = false,
}: PlayerCardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoading(false)
  }, [])

  const handleImageLoad = useCallback(() => {
    setImageLoading(false)
  }, [])

  const handleMoreClick = useCallback(() => {
    onBetClick?.('more', player)
  }, [onBetClick, player])

  const handleLessClick = useCallback(() => {
    onBetClick?.('less', player)
  }, [onBetClick, player])

  const shouldShowImage =
    player.avatar && !imageError && player.avatar.trim() !== ''

  // Enhanced card variants with loading state
  const cardVariants = {
    ...variants,
    loading: {
      opacity: 0.7,
      scale: 0.98,
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate={isLoading ? 'loading' : 'animate'}
      className={`relative bg-card-dark py-3 px-3 lg:px-4 rounded-xl border transition-all duration-300 group ${
        isStandalone ? 'shadow-lg hover:shadow-xl' : 'shadow-md hover:shadow-lg'
      } ${highlightCard ? 'border-light-green ring-1 ring-light-green/20' : 'border-gray-700/30'} ${
        isLoading ? 'pointer-events-none' : ''
      }`}
      whileHover={
        !isLoading
          ? {
              y: isStandalone ? -4 : -2,
              scale: isStandalone ? 1.02 : 1.01,
              transition: { duration: 0.2, ease: 'easeOut' },
            }
          : undefined
      }
      role="article"
      aria-label={`Player stats for ${player.name} - ${player.value} ${player.stat}`}
      tabIndex={isLoading ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isLoading) {
          e.preventDefault()
          // Focus on the first action button
          const moreButton = e.currentTarget.querySelector(
            '[data-action="more"]'
          ) as HTMLButtonElement
          moreButton?.focus()
        }
      }}
    >
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-card-dark/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10"
          >
            <div className="flex items-center gap-2 text-text-primary">
              <div className="w-4 h-4 border-2 border-light-green border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Updating...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-start gap-2 sm:gap-3 w-full">
        {/* Player Avatar with enhanced loading state */}
        <div className="mr-2 lg:mr-3 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex-shrink-0 overflow-hidden relative group-hover:ring-2 group-hover:ring-light-green/30 transition-all duration-300">
          {shouldShowImage ? (
            <>
              <AnimatePresence>
                {imageLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-gray-600/50"
                  >
                    <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>
              <Image
                src={player.avatar}
                className={`object-cover w-full h-full transition-all duration-300 ${
                  imageLoading
                    ? 'opacity-0'
                    : 'opacity-100 group-hover:scale-105'
                }`}
                width={56}
                height={56}
                alt={`${player.name} profile picture`}
                loading="lazy"
                sizes="(max-width: 1024px) 40px, 56px"
                onError={handleImageError}
                onLoad={handleImageLoad}
                priority={isStandalone} // Priority loading for standalone cards
              />
            </>
          ) : (
            <RxAvatar className="text-gray-400 w-10 h-10 lg:w-14 lg:h-14 transition-colors group-hover:text-gray-300" />
          )}
        </div>

        {/* Player Info with enhanced styling */}
        <div className="flex-1 min-w-0 space-y-0.5">
          <h3 className="font-semibold sm:font-bold text-white text-sm lg:text-lg truncate group-hover:text-light-green transition-colors duration-300">
            {player.name}
          </h3>
          <p className="text-gray-400 text-[10px] sm:text-xs lg:text-sm group-hover:text-gray-300 transition-colors duration-300">
            {player.team} - {player.position}
            {player.metadata?.playerNumber && (
              <span className="ml-1 text-light-green font-medium">
                #{player.metadata.playerNumber}
              </span>
            )}
          </p>
          <div className="text-text-primary text-[9px] sm:text-xs lg:text-sm space-y-0.5">
            <div className="flex items-center gap-1">
              <IoFootball className="w-3 h-3 text-light-green" />
              <span>vs. {player.match}</span>
            </div>
            <div className="flex items-center gap-1">
              <IoTimer className="w-3 h-3 text-gray-400" />
              <span>{player.date}</span>
            </div>
            {player.metadata?.isLive && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 font-medium text-[8px] sm:text-[10px]">
                  LIVE
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Stats Display */}
        <div className="self-center text-center bg-dark-navy rounded-lg border border-cream/20 w-12 h-16 sm:w-16 sm:h-20 lg:w-20 lg:h-24 flex items-center justify-center flex-shrink-0 group-hover:border-light-green/40 transition-colors duration-300">
          <div className="space-y-1">
            <div className="text-base sm:text-lg lg:text-2xl font-black text-white leading-none group-hover:text-light-green transition-colors duration-300">
              {player.value}
            </div>
            <div className="text-[8px] sm:text-xs lg:text-sm text-text-gray leading-tight px-1">
              {player.stat}
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex h-full flex-col gap-2 self-center ml-2 lg:ml-3">
          <motion.button
            data-action="more"
            whileHover={!isLoading ? { scale: 1.05 } : undefined}
            whileTap={!isLoading ? { scale: 0.95 } : undefined}
            onClick={handleMoreClick}
            disabled={isLoading}
            className={`flex h-8 sm:h-10 lg:h-12 flex-1 gap-1 lg:gap-2 items-center justify-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-[9px] sm:text-xs lg:text-sm font-semibold rounded-md transition-all duration-300 focus:ring-offset-2 focus:ring-2 focus:ring-offset-card-dark focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
              highlightMore
                ? 'bg-light-green text-dark-navy hover:bg-light-green/90 focus:ring-light-green shadow-lg shadow-light-green/20'
                : 'bg-dark-navy/80 text-text-primary hover:bg-dark-navy hover:text-white focus:ring-white/50 border border-gray-600/30 hover:border-light-green/50'
            }`}
            aria-label={`Bet more than ${player.value} ${player.stat} for ${player.name}`}
          >
            <span>More</span>
            <IoArrowUp className="text-xs lg:text-base" aria-hidden="true" />
          </motion.button>

          <motion.button
            data-action="less"
            whileHover={!isLoading ? { scale: 1.05 } : undefined}
            whileTap={!isLoading ? { scale: 0.95 } : undefined}
            onClick={handleLessClick}
            disabled={isLoading}
            className={`flex h-8 sm:h-10 lg:h-12 flex-1 gap-1 lg:gap-2 items-center justify-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-[9px] sm:text-xs lg:text-sm font-semibold rounded-md transition-all duration-300 focus:ring-offset-2 focus:ring-2 focus:ring-offset-card-dark focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
              highlightLess
                ? 'bg-light-green text-dark-navy hover:bg-light-green/90 focus:ring-light-green shadow-lg shadow-light-green/20'
                : 'bg-dark-navy/80 text-text-primary hover:bg-dark-navy hover:text-white focus:ring-white/50 border border-gray-600/30 hover:border-light-green/50'
            }`}
            aria-label={`Bet less than ${player.value} ${player.stat} for ${player.name}`}
          >
            <span>Less</span>
            <IoArrowDown className="text-xs lg:text-base" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
})

export default PlayerCard
