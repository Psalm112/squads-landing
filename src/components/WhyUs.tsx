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
    icon: '/assets/whyus/numerousOpp.svg',
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
    icon: '/assets/whyus/instantCashout.svg',
    cardStyle: {
      bgColor: 'bg-gradient-to-br from-[#104333] to-[#28A981]',
      textColor: 'text-text-primary',
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
    icon: '/assets/whyus/fastDeposit.svg',
    cardStyle: {
      bgColor: 'bg-white',
      textColor: 'text-[#20262E]',
      border: 'border-text-gray',
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
    description: (
      <span>
        No dey hide updates!!! Invite your friends and family to join squads and
        get paid <span className="font-bold">₦1000</span> when they use your
        referral link🤑
      </span>
    ),
    icon: '/assets/whyus/bonusesRewards.svg',
    cardStyle: {
      bgColor: 'bg-gradient-to-b from-[#FFC2F7] to-[#FFFBFD]',
      textColor: 'text-[#353E49]',
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
        className="relative text-text-primary text-center space-y-4 md:space-y-6 px-2 xxs:px-4 mb-12 lg:mb-20"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
          WHY THE STREET&nbsp;
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
        className="relative grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 max-md:gap-y-[20px] px-12 mt-[130px]"
      >
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`relative ${feature.cardStyle.rotate} max-md:max-w-[330px] mx-auto `}
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
            {index === 0 && (
              <svg
                width="32"
                height="34"
                viewBox="0 0 32 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 -left-[10%]"
              >
                <path
                  d="M26.5059 2.71875L27.2539 4.30957V4.31055L27.457 4.76172C28.9165 8.16553 28.9655 11.8833 27.8428 15.1709L28.25 15.7012L28.9688 16.6367L28.9727 16.6426L29.2627 17.0469C32.1477 21.2841 31.3789 27.1983 27.4033 30.4658L27.4004 30.4678C23.2402 33.8594 17.2646 33.0782 14.0264 28.7988V28.7979L13.3125 27.8691L12.7227 27.1006L13.4717 26.4863L15.8027 24.5732C10.4919 24.8862 5.29607 21.9161 2.84277 16.6709L2.84375 16.6699L2.09473 15.082L1.68262 14.2051L2.5459 13.7656L25.1465 2.25391L26.0664 1.78516L26.5059 2.71875Z"
                  fill="#6DE0E7"
                  stroke="#2F3843"
                  strokeWidth="2"
                />
              </svg>
            )}
            {index === features.length - 1 && (
              <svg
                width="29"
                height="31"
                viewBox="0 0 29 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-[40%] -right-[5%] md:bottom-[30%] md:-right-[2%] 2xl:bottom-[20%] 2xl:-right-[6%]"
              >
                <path
                  d="M15.0742 1.71143C16.6408 0.771911 18.6287 1.24662 19.6221 2.80225L19.7148 2.95654L21.1885 5.58936L21.3984 5.96338L21.8135 6.06982L24.5 6.7583L24.5049 6.75928C26.2709 7.20341 27.413 9.00778 27.0801 10.8706L27.043 11.0513V11.0522L26.3271 14.1733L26.2402 14.5503L26.4297 14.8872L27.5273 16.8384L27.5303 16.8442C28.4639 18.48 27.9635 20.5929 26.4053 21.6362L26.251 21.7339L26.2451 21.7378L24.6553 22.7017L24.292 22.9224L24.1982 23.3364L23.7295 25.4214C23.303 27.2749 21.5801 28.3873 19.832 28.0425L19.6631 28.0044L17.4277 27.4312L17.0195 27.3267L16.6602 27.5454L13.9072 29.2202C12.3626 30.1566 10.3615 29.6809 9.3877 28.1333L9.29688 27.98L9.29492 27.978L7.79492 25.3149L7.58496 24.9438L7.17188 24.8374L4.48438 24.1489L4.48047 24.1479L4.31152 24.1001C2.64203 23.5866 1.58276 21.8386 1.90527 20.0356L1.94141 19.855L2.6582 16.7329L2.74512 16.356L2.55566 16.019L1.45801 14.0679C0.539372 12.4269 1.04683 10.3357 2.58008 9.31592L2.73145 9.22021L2.73926 9.21533L4.33008 8.25146L4.69336 8.03076L4.78711 7.61572L5.25586 5.53174C5.68179 3.68048 7.42608 2.56223 9.16113 2.89111L9.3291 2.92725L11.5576 3.49854L11.9648 3.60303L12.3252 3.38428L15.0742 1.71143Z"
                  fill="#FD89ED"
                  stroke="#232D39"
                  strokeWidth="2"
                />
              </svg>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  )
}

export default WhyUs
