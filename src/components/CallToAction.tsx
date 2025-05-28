import React from 'react'
import { Button } from './ui/Button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery'

function CallToAction() {
  const isMD = useMediaQuery('(min-width: 768px)')
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      rotate: [-1, 1, -1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <section
      className="py-[80px] relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      role="region"
      aria-labelledby="community-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0 h-full"
        style={{
          backgroundImage: isMD
            ? 'url("/assets/bg3.png")'
            : 'url("/assets/bg3sm.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundBlendMode: 'overlay',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="container mx-auto px-4 py-12 md:py-20 relative z-10"
      >
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <motion.h2
            variants={itemVariants}
            id="community-heading"
            className="text-[#271437] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight mb-6 md:mb-8 max-w-4xl mx-auto"
          >
            JOIN AN ECOSYSTEM THAT KEEPS GIVING
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-[#402562] text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-4xl mx-auto px-4"
          >
            Our values are more than just words—they are the guiding principles
            that shape our company culture, help us navigate challenges, and
            ensure we stay true to our purpose.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-12 md:mb-16">
            <Button
              size="lg"
              variant="secondary"
              aria-label="Sign Up on Squads to join our ecosystem"
              className="text-[#2A343F] bg-light-green hover:bg-light-green/80 font-bold px-6 py-3 md:px-8 md:py-4 rounded-md text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none"
            >
              Sign Up on Squads
              <Image
                src="/assets/cash.png"
                alt=""
                width={20}
                height={20}
                className="ml-2"
                loading="lazy"
              />
            </Button>
          </motion.div>
        </div>

        {/* Cards Section */}
        <div className="relative">
          <div className="h-fit flex flex-col lg:flex-row justify-center items-center w-full py-10 px-4">
            {/* Promo Cash */}
            <div className="relative w-full max-w-[320px] aspect-[6/7] translate-y-[15%] lg:translate-x-[10%]">
              <motion.div
                variants={cardVariants}
                animate={floatingVariants.animate}
                className="relative w-full h-full"
              >
                <Image
                  src="/assets/cta/promo-card.png"
                  alt="₦500 Promo Cash"
                  fill
                  className="object-contain"
                  loading="lazy"
                  quality={90}
                />
              </motion.div>
            </div>
            {/* Deposit Boost */}
            <div className="relative w-full max-w-[320px] aspect-[6/7] z-10 lg:translate-y-[10%]">
              <motion.div
                variants={cardVariants}
                animate={{
                  y: [0, -8, 0],
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  },
                }}
                className="relative w-full h-full"
              >
                <Image
                  src="/assets/cta/deposit-boost-card.png"
                  alt="Deposit Boost"
                  fill
                  loading="lazy"
                  className="object-contain"
                  quality={90}
                />
              </motion.div>
            </div>
            {/* Sneaky Cash */}
            <div className="relative w-full max-w-[320px] aspect-[6/7] max-lg:-rotate-[12.71deg] -translate-y-[13%] lg:-translate-x-[17%]">
              <motion.div
                variants={cardVariants}
                animate={{
                  ...floatingVariants.animate,
                  transition: {
                    ...floatingVariants.animate.transition,
                    delay: 2,
                  },
                }}
                className="relative w-full h-full"
              >
                <Image
                  src="/assets/cta/sneaky-cash-card.png"
                  alt="Sneaky Cash"
                  fill
                  loading="lazy"
                  className="object-contain"
                  quality={90}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default CallToAction
