import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/utils'
import { Logo } from '../icons'

interface LeaderboardEntry {
  name: string
  avatar: string
  attempts: number
  score: number
  status: 'online' | 'offline'
}

interface LeaderboardCardProps {
  className?: string
  title: string
  subtitle: string
  leaderboard: LeaderboardEntry[]
  author: {
    name: string
    handle: string
    avatar: string
  }
  hashtag?: string
  delay?: number
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  className,
  title,
  subtitle,
  leaderboard,
  author,
  hashtag = '#Squadgame',
  delay = 0,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={cn(
        'relative bg-card-dark backdrop-blur-sm rounded-2xl p-6 overflow-hidden',
        className
      )}
      role="article"
      aria-label="Leaderboard card"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-light-green rounded-full"></div>
          <div className="w-3 h-3 bg-light-green rounded-full"></div>
        </div>
        <span className="text-slate-400 text-sm font-medium">{subtitle}</span>
      </div>

      {/* Leaderboard */}
      <div className="space-y-3 mb-6">
        {leaderboard.map((entry, index) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors group/entry overflow-hidden" // Added group/entry and overflow-hidden
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-600">
                  <Image
                    src={entry.avatar}
                    alt={`${entry.name}'s avatar`}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div
                  className={cn(
                    'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800',
                    entry.status === 'online'
                      ? 'bg-light-green'
                      : 'bg-slate-500'
                  )}
                  aria-label={`${entry.name} is ${entry.status}`}
                />
              </div>
              <div>
                <p className="text-text-primary font-medium text-sm">
                  {entry.name}
                </p>
                <p className="text-slate-400 text-xs">
                  {entry.attempts} Passing Attempts
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-light-green font-bold text-lg">
                {entry.score}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-text-primary text-lg font-bold mb-4 leading-tight">
        {title}
      </h3>

      {/* Hashtag */}
      <span className="inline-block text-light-green font-semibold text-lg mb-6 hover:text-green-300 transition-colors">
        {hashtag}
      </span>

      {/* Author */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-[4]">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-600 group/author">
            <Image
              src={author.avatar}
              alt={`${author.name}'s avatar`}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <p className="text-slate-400 text-xs">{author.handle}</p>
          </div>
        </div>

        <Logo className="w-24 lg:w-32" />
      </div>

      {/* Shine Effect - Fixed to work with group class */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
      </div>
    </motion.article>
  )
}

export default LeaderboardCard
