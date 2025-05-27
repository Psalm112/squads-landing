import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Logo } from '../icons'

interface StatsCardProps {
  className?: string
  title: string
  description: string
  image: string
  author: {
    name: string
    handle: string
    avatar: string
  }
  hashtag?: string
  delay?: number
}

const StatsCard: React.FC<StatsCardProps> = ({
  className,
  title,
  description,
  image,
  author,
  hashtag = '#TheRunIn',
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
        'relative bg-card-dark backdrop-blur-sm rounded-2xl p-6 group overflow-hidden',
        className
      )}
      role="article"
      aria-label={`Statistics card: ${title}`}
    >
      {/* Main Image */}
      <div className="relative w-full h-80 mb-4 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={author.name}
          fill
          className="transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Description */}
      <p className="text-white text-base leading-relaxed mb-4">{description}</p>

      {/* Hashtag */}
      <span className="inline-block text-light-green font-semibold text-lg mb-6 hover:text-green-300 transition-colors">
        {hashtag}
      </span>

      {/* Author */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-600">
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

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
      </div>
    </motion.article>
  )
}

export default StatsCard
