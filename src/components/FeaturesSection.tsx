'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import Image from 'next/image'
import { Goal, Glove, Boot, Target } from './icons'
import { IoArrowDown, IoArrowUp } from 'react-icons/io5'
const iconFeatures: {
  icon: ReactNode
  bgColor: string
  shape: 'square' | 'circle'
}[] = [
  {
    icon: <Goal />,
    bgColor: 'bg-pink',
    shape: 'square',
  },
  {
    icon: <Glove />,
    bgColor: 'bg-[#6DE0E7]',
    shape: 'circle',
  },
  {
    icon: <Boot />,
    bgColor: 'bg-[#88C80C]',
    shape: 'square',
  },
  {
    icon: <Target />,
    bgColor: 'bg-[#F9CC00]',
    shape: 'circle',
  },
]

const playerCards = [
  {
    id: 1,
    name: 'Erling Haaland',
    team: 'Manchester City',
    position: 'Forward',
    match: 'Arsenal City',
    date: 'Sat Mar 11:20 PM',
    stat: 'Goals',
    value: '2.5',
    avatar: '/api/placeholder/40/40',
  },
  {
    id: 2,
    name: 'Andrea Onana',
    team: 'Manchester United',
    position: 'Goalkeeper',
    match: 'Manchester City',
    date: 'Sat Mar 11:20 PM',
    stat: 'Saves',
    value: '3.5',
    avatar: '/api/placeholder/40/40',
  },
  {
    id: 3,
    name: 'Cole Palmer',
    team: 'Chelsea',
    position: 'Forward',
    match: 'Fulham',
    date: 'Sat Mar 11:20 PM',
    stat: 'Shots',
    value: '45.5',
    avatar: '/api/placeholder/40/40',
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      rotate: [-1, 1, -1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <>
      <section className="lg:block bg-cream min-h-screen pt-16 pb-24 px-8 relative">
        {/* Decorative wave border */}
        <div className="z-20 absolute top-0 right-0 -translate-y-[75%] xxs:-translate-y-[85%] -translate-x-[32vw] xxs:-translate-x-[13vw] xl:-translate-x-[18vw] inline-block">
          <svg
            width="99"
            height="101"
            viewBox="0 0 99 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-sm:w-[80%]"
          >
            <path
              d="M92.1647 34.5039C96.8664 37.9773 97.7035 44.8335 96.322 52.076C94.9062 59.4988 91.0436 68.1716 85.1432 76.4112C79.2429 84.6506 72.3092 91.0545 65.789 94.7072C59.425 98.2724 52.7403 99.5679 48.0286 96.0874C45.2572 94.04 43.8363 90.7883 43.4103 87.0902C43.1367 84.7149 43.2622 82.0796 43.7343 79.2869C41.266 80.6058 38.8355 81.5387 36.5241 82.0046C32.9252 82.73 29.4363 82.3531 26.6657 80.3065C22.7026 77.3787 21.4741 72.064 22.0129 66.1147C16.6063 68.4679 11.2502 68.9189 7.28698 65.9912C2.57538 62.5107 1.73047 55.6529 3.10944 48.4054C4.52234 40.98 8.38416 32.3068 14.2844 24.0673C20.1847 15.8278 27.1197 9.42387 33.6399 5.77114C40.0038 2.20615 46.6879 0.909939 51.3995 4.39039C55.3625 7.31788 56.5906 12.632 56.0521 18.5808C61.4585 16.2277 66.8151 15.7782 70.7782 18.7056C73.5488 20.7522 74.9765 24.0076 75.4087 27.7093C75.6864 30.0883 75.5638 32.7276 75.0935 35.5239C77.5626 34.2044 79.9943 33.2718 82.3063 32.8058C85.9052 32.0804 89.3942 32.4573 92.1647 34.5039Z"
              fill="#F9CC00"
              stroke="#262F3B"
              strokeWidth="4"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="flex flex-col items-center"
          >
            <div className="max-w-2xl">
              {/* Icon Row */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-center"
              >
                <div className="flex gap-x-4 items-center justify-center">
                  {iconFeatures.slice(0, 2).map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`${feature.bgColor} border-dark border-2 w-16 h-16 rounded-2xl flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-3xl">{feature.icon}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-x-4 items-center justify-center">
                  {iconFeatures.slice(2, 4).map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`${feature.bgColor} border-dark border-2 w-16 h-16 rounded-2xl flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-3xl">{feature.icon}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="mt-2 mb-12 text-5xl text-center font-black text-dark-navy leading-tight"
              >
                WIN UP TO 100X YOUR CASH. JUST PICK MORE OR LESS
              </motion.h1>
            </div>

            <div className="w-full max-2xl:px-4 relative">
              {/* Instruction Text with Arrow */}
              <motion.div
                variants={itemVariants}
                className="relative w-[30%] lg:ml-40 xl:ml-60 mb-4 xl:mb-6"
              >
                <p className="text-2xl font-cursive font-black text-dark-navy -rotate-[3deg] lg:-rotate-[1deg] text-center">
                  Pick more or less on your favourite players stats
                </p>

                {/* Curved Arrow positioned absolutely below the text */}
                <motion.svg
                  initial={{
                    pathLength: 0,
                    opacity: 0,
                    y: -20,
                  }}
                  animate={
                    isInView
                      ? {
                          pathLength: 1,
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          pathLength: 0,
                          opacity: 0,
                          y: -20,
                        }
                  }
                  transition={{
                    pathLength: { duration: 2, delay: 1 },
                    opacity: { duration: 0.5, delay: 0.8 },
                    y: {
                      duration: 0.8,
                      delay: 0.8,
                      type: 'spring',
                      stiffness: 100,
                    },
                  }}
                  width="248"
                  height="129"
                  className="absolute top-8 -right-[110%] lg:-right-[100%]  mt-2 w-full"
                  viewBox="0 0 248 129"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M1.37004 19.1816C94.6528 -26.8737 215.956 29.2278 190.256 82.9448C177.879 108.817 136.67 78.3885 165.757 59.6807C201.336 36.7969 239.06 92.7226 237.043 126.088M237.043 126.088L226.48 117.972M237.043 126.088L246.785 119.199"
                    stroke="#88C80C"
                    strokeWidth="3.51486"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{
                      duration: 2,
                      delay: 1,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Arrow tip animation */}
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      delay: 2.8,
                      duration: 0.4,
                      type: 'spring',
                      stiffness: 300,
                      damping: 15,
                    }}
                  >
                    <motion.circle
                      cx="237"
                      cy="126"
                      r="3"
                      fill="#88C80C"
                      initial={{ scale: 1 }}
                      animate={isInView ? { scale: 1.1 } : { scale: 1 }}
                      transition={{
                        delay: 3.2,
                        duration: 0.3,
                        ease: 'easeOut',
                      }}
                    />
                  </motion.g>
                </motion.svg>
              </motion.div>
              {/* Player Cards */}
              <div className="flex flex-col items-center">
                <div className="flex items-center w-full">
                  <div className="rotate-[7deg] w-full flex-[2]">
                    <motion.div
                      variants={itemVariants}
                      className="flex flex-col gap-y-4 w-fit mx-auto"
                    >
                      {playerCards.map((player, index) => (
                        <motion.div
                          key={player.id}
                          variants={itemVariants}
                          className="relative bg-card-dark py-3 px-4 rounded-xl"
                          whileHover={{ y: -4, scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-start gap-2 w-full ">
                            <div className="mr-3 w-14 h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex-shrink-0">
                              <Image
                                src="/assets/onana.jpg"
                                className="object-cover w-14 h-14 rounded-full"
                                width={56}
                                height={56}
                                alt="onana"
                              />
                            </div>
                            <div className="w-fit mr-4">
                              <h3 className="font-bold text-white text-lg inline-block">
                                {player.name}
                              </h3>
                              <br />
                              <span className="text-gray-400 text-xs w-full">
                                {player.team} - {player.position}
                              </span>
                              <br />
                              <span className="text-cream/80 text-sm w-full">
                                vs {player.match} on
                              </span>
                              <br />
                              <span className="text-cream/80 text-sm">
                                {player.date}
                              </span>
                            </div>

                            <div className="self-center text-center bg-dark-navy rounded-md border border-1 border-cream/20 ml-auto w-[80px] h-[90px] flex items-center justify-center">
                              <div>
                                <div className="text-2xl font-black text-white h-full m-auto">
                                  {player.value}
                                </div>
                                <div className="text-sm text-gray-400 h-full">
                                  {player.stat}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-y-2 self-center">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex gap-2 items-center px-4 py-2 font-semibold rounded-md ${index === 0 ? 'bg-light-green text-dark-navy' : 'bg-dark-navy/80  text-white'}`}
                              >
                                <span>More</span>
                                <IoArrowUp />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex gap-2 items-center px-4 py-2 font-semibold rounded-md ${index === 1 ? 'bg-light-green text-dark-navy' : 'bg-dark-navy/80  text-white'}`}
                              >
                                <span>Less</span>
                                <IoArrowDown />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                  {/*  */}
                  <div className="w-full flex-[1]">
                    {/* Multiplier Text */}
                    <div className=" relative w-fit translate-x-[10%] -translate-y-[30%]">
                      <motion.div
                        variants={itemVariants}
                        className="absolute -top-[140%] -right-[5%] text-left"
                      >
                        <div className="flex flex-col items-center">
                          <span className="self-start ml-4 text-xl font-cursive font-bold text-dark-navy">
                            8 picks =
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-4xl font-black text-pink">
                              100X
                            </span>
                            <span className="text-xl font-cursive font-bold text-dark-navy">
                              you entry
                              <br />
                              amount
                            </span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Entry Amount Cards */}
                      <div className="-rotate-[7deg]">
                        <motion.div
                          variants={itemVariants}
                          className="flex items-center gap-x-4"
                        >
                          <div className="text-left">
                            <p className=" text-gray-600 mb-2">Entry Amount</p>
                            <div className="bg-dark-navy text-white font-bold text-xl px-6 py-4 rounded-lg inline-block">
                              ₦1,000
                            </div>
                          </div>
                          <div className="text-left">
                            <p className="text-gray-600 mb-2">
                              Potential Payout
                            </p>
                            <div className="bg-dark-navy text-white font-bold text-xl px-6 py-4 rounded-lg inline-block">
                              ₦3,000
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      <div className="absolute -bottom-[210%] lg:left-[60%] xl:left-[40%] w-fit">
                        <svg
                          width="37"
                          height="116"
                          viewBox="0 0 37 116"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M35.9774 1.46289C26.8388 7.43816 9.41035 37.2747 24.7299 57.7007C52.1458 94.2552 16.5284 103.277 2.9375 110.775M2.9375 110.775L7.85693 99.176M2.9375 110.775L16.2926 114.29"
                            stroke="#88C80C"
                            strokeWidth="3.51486"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <motion.div variants={itemVariants} className="relative ">
                  {/* Withdraw */}
                  <div className="-rotate-[12deg] translate-x-[100%]">
                    <motion.div
                      whileHover={{ y: -6, rotate: 2 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-md p-6 max-w-sm mx-auto border border-1 border-dark-navy"
                    >
                      <div className="rounded-md h-[150px] mb-6 relative overflow-hidden">
                        <Image
                          src="/assets/withdrawbg.jpg"
                          alt="withdraw"
                          fill
                        />
                      </div>
                      <div className="text-center space-y-4">
                        <p className="text-base text-gray-600">
                          You bad, no worry 😅🔥
                        </p>
                        <p className="text-sm text-dark-green font-semibold">
                          You won
                        </p>
                        <p className="text-4xl font-black text-dark-navy">
                          ₦3,000
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-light-green text-dark-navy text-xs font-semibold px-3 py-4 rounded-md transition-all duration-200"
                        >
                          Flex your wins 🚀
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-[40%] right-[40%] w-full">
                    <svg
                      width="189"
                      height="110"
                      viewBox="0 0 189 110"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M188.233 84.8366C83.3599 59.6039 15.4684 74.4691 32.7633 102.73C43.7124 120.621 91.6394 84.5661 39.6628 48.5943C3.6012 23.6369 15.7444 -4.01267 15.7444 3.17483M15.7444 3.17483L26.7837 16.9387M15.7444 3.17483L1.94531 21.9851"
                        stroke="#88C80C"
                        strokeWidth="3.51486"
                      />
                    </svg>
                    <span className="translate-x-[20%] font-cursive font-bold text-2xl text-center text-dark-navy inline-block">
                      Withdraw your winnings
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
