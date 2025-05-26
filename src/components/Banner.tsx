'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Boot, Dribble, Foul, Glove, Shot } from './icons'

const bannerItems = [
  { title: 'Dribble', icon: <Dribble className="w-6 h-6" /> },
  { title: 'Shots', icon: <Shot className="w-6 h-6" /> },
  { title: 'Goalie-Saves', icon: <Glove className="w-6 h-6" /> },
  { title: 'Tackles', icon: <Boot className="w-6 h-6" /> },
  { title: 'Fouls', icon: <Foul className="w-6 h-6" /> },
  { title: 'Goalie-Saves', icon: <Glove className="w-6 h-6" /> },
]

const Banner = () => {
  const duplicatedItems = useMemo(() => [...bannerItems, ...bannerItems], [])

  return (
    <div className="relative w-[105vw] translate-x-[-2.5vw]">
      <div className="rotate-[2.5deg] bg-dark-green py-2">
        <motion.div
          className="flex gap-4 px-4 whitespace-nowrap will-change-transform"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="flex items-center gap-4 text-dark-navy font-black text-xl uppercase flex-shrink-0"
            >
              <span>{item.title}</span>
              <span className="flex-shrink-0" aria-hidden="true">
                {item.icon}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Banner
