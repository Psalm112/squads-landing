'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'

export default function WithdrawCard({
  variants,
  className,
}: {
  variants?: Variants
  className?: string
}) {
  const isMobile = useMediaQuery('(max-width: 480px)')
  const isTiny = useMediaQuery('(max-width: 320px)')
  return (
    <motion.div
      variants={variants}
      className={`relative w-fit mx-auto ${className}`}
    >
      <motion.div
        whileHover={{ y: -6, rotate: -9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-md p-2 xxs:p-4 sm:p-6 shadow-lg border border-dark-navy"
      >
        <div className="rounded-md mb-4 w-fit sm:mb-6 relative overflow-hidden">
          <Image
            src="/assets/withdrawbg.jpg"
            alt="Celebration background"
            width={isMobile ? (isTiny ? 170 : 200) : 250}
            height={100}
            className="object-cover w-auto h-auto"
          />
        </div>
        <div className="text-center space-y-2 sm:space-y-4">
          <p className="text-sm sm:text-base text-gray-600">
            You bad, no worry 😭🔥
          </p>
          <p className="text-xs sm:text-sm text-dark-green font-semibold">
            You won
          </p>
          <p className="text-2xl sm:text-4xl font-black text-dark-navy">
            ₦3,000
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-light-green text-dark-navy text-xs font-semibold px-3 py-2 sm:py-4 rounded-md transition-all duration-200"
            aria-label="Share your winnings"
          >
            Flex your wins 🚀
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
