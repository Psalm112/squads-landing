'use client'

import { AnimatedArrowProps } from '@/types'
import { motion } from 'framer-motion'

export default function AnimatedArrow({
  className = '',
  pathData,
  width,
  height,
  viewBox,
  isInView,
  stroke = '#88C80C',
  strokeWidth = '3.51486',
  delay = 1,
}: AnimatedArrowProps) {
  return (
    <motion.svg
      initial={{ pathLength: 0, opacity: 0 }}
      animate={
        isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
      }
      transition={{
        pathLength: { duration: 2, delay },
        opacity: { duration: 0.5, delay: delay - 0.2 },
      }}
      width={width}
      height={height}
      className={className}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.path
        d={pathData}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2, delay, ease: 'easeInOut' }}
      />
    </motion.svg>
  )
}
