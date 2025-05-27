'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface FeatureCard {
  id: string
  title: {
    text: string
    color: string
  }
  description: React.ReactNode
  cardStyle: {
    bgColor: string
    border: string
    textColor: string
    rotate: string
  }
  icon: string
  decorativeElement?: React.ReactNode
}

const features: FeatureCard[] = [
  {
    id: 'numerous-options',
    title: {
      text: 'Numerous Options',
      color: 'text-[#D0F091]',
    },
    description: (
      <span>
        Bet Your Way with Endless Options! No matter your game, we&apos;ve got
        the odds, the excitement, and the options just for you!&nbsp;
        <Image
          src="/assets/greenHeart.svg"
          alt="love numerous options"
          width={16}
          height={16}
          className="inline"
        />
      </span>
    ),
    icon: '/assets/numerousOpp.svg',
    cardStyle: {
      bgColor: 'bg-gradient-to-b from-[#232D39] to-[#000000]',
      textColor: 'text-[#FAFEFA]',
      border: 'border-card-dark',
      rotate: 'rotate-[5deg] md:-rotate-[5deg]',
    },
  },
  {
    id: 'instant-cashout',
    title: {
      text: 'Instant Cashout',
      color: 'text-[#D0F091]',
    },
    description:
      "Say goodbye to waiting! With Squads, you can cash out your funds instantly—any time, any day. Whether it's a weekend or midnight, your money is just a tap away.🚀",
    icon: '/assets/instantCashout.svg',
    cardStyle: {
      bgColor: 'bg-gradient-to-br from-[#104333] to-[#28A981]',
      textColor: 'text-[#FAFEFA]',
      border: 'border-card-dark',
      rotate:
        '-rotate-[3deg] max-md:translate-x-[10%] md:rotate-[2deg] md:-translate-y-[10%]',
    },
  },
  {
    id: 'fast-deposit',
    title: {
      text: 'Fast Deposit',
      color: 'text-dark-navy',
    },
    description:
      "Don't let slow transactions hold you back. With Squads, you can deposit funds instantly and stay in the game. Your winning streak starts here!🚀",
    icon: '/assets/fastDeposit.svg',
    cardStyle: {
      bgColor: 'bg-white',
      textColor: 'text-light-navy',
      border: 'border-[#797F86]',
      rotate:
        'z-10 rotate-[4deg] md:rotate-[5deg] 2xl:-translate-x-[10%] md:translate-y-[10%]',
    },
  },
  {
    id: 'bonuses-rewards',
    title: {
      text: 'Bonuses & Rewards',
      color: 'text-dark-navy',
    },
    description:
      'No dey hide updates!!! Invite your friends and family to join squads and get paid ₦1000 when they use your referral link🤑',
    icon: '/assets/bonusesRewards.svg',
    cardStyle: {
      bgColor: 'bg-gradient-to-b from-[#FFC2F7] to-[#FFFBFD]',
      textColor: 'text-light-navy',
      border: 'border-[#4C545D]',
      rotate: '-rotate-[3deg] md:-rotate-[5deg] 2xl:-translate-x-[12%]',
    },
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
}

const floatingVariants = {
  float: (i: number) => ({
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      delay: i * 0.3,
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
}

function WhyUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative text-white/90 text-center space-y-4 md:space-y-6 px-2 xxs:px-4 mb-12 lg:mb-20"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
          WHY THE STREET{' '}
          <span className="font-cursive text-light-green relative">F**k</span>
          <br className="hidden sm:block" />
          WITH SQUADS
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base sm:text-lg lg:text-xl xxs:w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] mx-auto text-white/80 leading-relaxed"
        >
          Enjoy the swift and sweet benefits squads have for you. We are here
          for you 100% any day anytime!
        </motion.p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 max-md:gap-y-[20px] px-12 mt-[130px]"
      >
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`${feature.cardStyle.rotate} max-md:max-w-[330px] mx-auto `}
          >
            <motion.div
              //   key={feature.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative group cursor-pointer`}
            >
              <motion.article
                variants={floatingVariants}
                animate="float"
                custom={index}
                className={`
                ${feature.cardStyle.bgColor} ${feature.cardStyle.textColor}
                rounded-2xl lg:rounded-3xl p-6 lg:p-8 h-full
                shadow-2xl hover:shadow-3xl
                transition-all duration-300 ease-out
                border border-1 ${feature.cardStyle.border} backdrop-blur-sm
                relative overflow-hidden
                min-h-[320px] lg:min-h-[380px]
                flex flex-col justify-between
              `}
                role="article"
                aria-labelledby={`${feature.id}-title`}
              >
                {/* Icon Section */}
                <motion.div
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="flex-[6] w-full h-full mb-6 transition-all duration-300"
                  style={{
                    backgroundImage: `url(${feature.icon})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                  aria-hidden="true"
                />

                {/* Content Section */}
                <div className="relative z-10 flex-1 flex flex-col h-fit self-end">
                  <motion.h3
                    id={`${feature.id}-title`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`text-base md:text-xl lg:text-2xl md:font-bold mb-2 lg:mb-4 leading-tight ${feature.title.color}`}
                  >
                    {feature.title.text}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className={`
                    text-[10px] md:text-xs lg:text-sm leading-relaxed
                    ${feature.cardStyle.textColor} '}
                  `}
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </motion.article>
              {/* Hover Effect Arrow */}
              <motion.div
                className="absolute bottom-[5%] left-[10%] mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`${feature.cardStyle.textColor}`}
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

export default WhyUs
