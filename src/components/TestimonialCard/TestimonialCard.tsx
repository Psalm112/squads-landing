import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/utils'
import { TestimonialCardProps } from '@/types'
import { Logo } from '../icons'

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  className,
  content,
  author,
  image,
  hashtag = '#Squadgame',
  delay = 0,
}) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const overlayVariants = {
    hover: {
      opacity: 0.9,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: '-50px' }}
      className={cn(
        'relative overflow-hidden rounded-2xl group bg-card-dark cursor-pointer',
        'transition-all duration-300',
        image ? 'h-80 sm:h-96' : 'h-auto min-h-[200px]',
        className
      )}
      role="article"
      aria-label={`Testimonial from ${author.name}`}
    >
      <motion.div className="relative w-full h-full">
        {/* Content Layout */}
        <div
          className={cn(
            'flex flex-col relative gap-y-4',
            image ? 'absolute inset-0 p-4 overflow-hidden' : 'relative p-6'
          )}
        >
          <div className="flex-1 flex flex-col relative">
            {image && <div className="flex-1" />}
            {image && (
              <div className="absolute inset-0 bottom-0 ">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={false}
                  />
                  <motion.div
                    variants={overlayVariants}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"
                  />
                </div>
              </div>
            )}
            {/* Main Content */}
            <div className={cn('space-y-3', image ? 'px-6 pb-4' : 'mb-2')}>
              <p
                className={cn(
                  'text-lg sm:text-xl font-bold leading-tight',
                  image ? 'text-white drop-shadow-lg' : 'text-slate-100'
                )}
              >
                {content}
              </p>

              {hashtag && (
                <span className="inline-block text-light-green font-bold text-lg hover:text-green-300 transition-colors drop-shadow-md">
                  {hashtag}
                </span>
              )}
            </div>
          </div>

          {/* Author Section */}
          <div
            className={cn(
              'flex items-center justify-between',
              image ? 'backdrop-blur-sm' : ''
            )}
          >
            <div className="flex items-center gap-3 flex-[4]">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg">
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
        </div>
        {/* Shine effect*/}
        {image && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
          </div>
        )}
      </motion.div>
    </motion.article>
  )
}

export default TestimonialCard
