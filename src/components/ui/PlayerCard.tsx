'use client'

import { PlayerCardProps } from '@/types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { IoArrowDown, IoArrowUp } from 'react-icons/io5'
import { RxAvatar } from 'react-icons/rx'

export default function PlayerCard({
  player,
  variants,
  isStandalone = true,
  highlightMore = false,
  highlightLess = false,
  highlightCard = false,
}: PlayerCardProps) {
  return (
    <motion.div
      variants={variants}
      className={`relative bg-card-dark py-3 px-3 lg:px-4 rounded-xl border  transition-all duration-300 ${
        isStandalone ? 'shadow-lg hover:shadow-xl' : 'shadow-md hover:shadow-lg'
      } ${highlightCard ? 'border-light-green' : 'border-gray-700/30'}`}
      whileHover={{
        y: isStandalone ? -4 : -2,
        scale: isStandalone ? 1.02 : 1.01,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      role="article"
      aria-label={`Player stats for ${player.name} - ${player.value} ${player.stat}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
        }
      }}
    >
      <div className="flex items-start gap-2 sm:gap-3 w-full">
        {/* Player Avatar */}
        <div className="mr-2 lg:mr-3 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex-shrink-0 overflow-hidden">
          {player && player.avatar === '' ? (
            <Image
              src={player.avatar}
              className="object-cover w-full h-full"
              width={56}
              height={56}
              alt={`${player.name} profile picture`}
              loading="lazy"
              sizes="(max-width: 1024px) 40px, 56px"
            />
          ) : (
            <RxAvatar className="text-gray-400 w-10 h-10 lg:w-14 lg:h-14" />
          )}
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0 space-y-0.5">
          <h3 className="font-semibold sm:font-bold text-white text-sm lg:text-lg truncate">
            {player.name}
          </h3>
          <p className="text-gray-400 text-[10px] sm:text-xs lg:text-sm">
            {player.team} - {player.position}
          </p>
          <div className="text-text-primary text-[9px] sm:text-xs lg:text-sm space-y-0.5">
            <p>vs. {player.match} on</p>
            <p>{player.date}</p>
          </div>
        </div>

        {/* Stats Display */}
        <div className="self-center text-center bg-dark-navy rounded-lg border border-cream/20 w-12 h-16 sm:w-16 sm:h-20 lg:w-20 lg:h-24 flex items-center justify-center flex-shrink-0">
          <div className="space-y-1">
            <div className="text-base sm:text-lg lg:text-2xl font-black text-white leading-none">
              {player.value}
            </div>
            <div className="text-[8px] sm:text-xs lg:text-sm text-text-gray leading-tight px-1">
              {player.stat}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex h-full flex-col gap-2 self-center ml-2 lg:ml-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex h-8 sm:h-10 lg:h-12 flex-1 gap-1 lg:gap-2 items-center justify-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-[9px] sm:text-xs lg:text-sm font-semibold rounded-md transition-all duration-200 focus:ring-offset-2 focus:ring-2 focus:ring-offset-card-dark focus:outline-none ${
              highlightMore
                ? 'bg-light-green text-dark-navy hover:bg-light-green/90 focus:ring-light-green'
                : 'bg-dark-navy/80 text-text-primary hover:bg-dark-navy focus:ring-white/50'
            }`}
            aria-label={`Bet more on ${player.value} ${player.stat} for ${player.name}`}
          >
            <span>More</span>
            <IoArrowUp className="text-xs lg:text-base" aria-hidden="true" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex h-8 sm:h-10 lg:h-12 flex-1 gap-1 lg:gap-2 items-center justify-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-[9px] sm:text-xs lg:text-sm font-semibold rounded-md transition-all duration-200 focus:ring-offset-2 focus:ring-2 focus:ring-offset-card-dark focus:outline-none ${
              highlightLess
                ? 'bg-light-green text-dark-navy hover:bg-light-green/90 focus:ring-light-green'
                : 'bg-dark-navy/80 text-text-primary hover:bg-dark-navy focus:ring-white/50'
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
}
