'use client'

import { motion, Variants } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Goal, Glove, Boot, Target } from '../icons'
import PlayerCard from '../ui/PlayerCard'
import WithdrawCard from './WithdrawCard'
import AnimatedArrow from './AnimatedArrow'
import { IconFeature, PlayerCardData } from '@/types'
import Banner from '../Banner'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const IconGrid = ({ variants }: { variants: Variants }) => {
  const iconFeatures: IconFeature[] = [
    { icon: <Goal />, bgColor: 'bg-pink', shape: 'square' },
    { icon: <Glove />, bgColor: 'bg-[#6DE0E7]', shape: 'circle' },
    { icon: <Boot />, bgColor: 'bg-[#88C80C]', shape: 'square' },
    { icon: <Target />, bgColor: 'bg-[#F9CC00]', shape: 'circle' },
  ]

  return (
    <motion.div
      variants={variants}
      className="flex flex-wrap gap-y-2 gap-x-4 items-center justify-center mb-4 sm:mb-0"
    >
      <div className="flex gap-x-4 items-center">
        {iconFeatures.slice(0, 2).map((feature, index) => (
          <motion.div
            key={index}
            variants={variants}
            className={`${feature.bgColor} border-dark border-2 w-14 h-14 sm:w-16 sm:h-16 ${feature.shape === 'circle' ? 'rounded-full' : 'rounded-xl'} flex items-center justify-center`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            role="button"
            tabIndex={0}
            aria-label={`Feature icon ${index + 1}`}
          >
            <span className="text-xl sm:text-3xl">{feature.icon}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-x-4 items-center">
        {iconFeatures.slice(2, 4).map((feature, index) => (
          <motion.div
            key={index}
            variants={variants}
            className={`${feature.bgColor} border-dark border-2 w-14 h-14 sm:w-16 sm:h-16 ${feature.shape === 'circle' ? 'rounded-full' : 'rounded-xl'} flex items-center justify-center`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            role="button"
            tabIndex={0}
            aria-label={`Feature icon ${index + 1}`}
          >
            <span className="text-xl sm:text-3xl">{feature.icon}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const isSmall = useMediaQuery('(max-width: 768px)')
  const isTiny = useMediaQuery('(max-width: 350px)')
  const layoutBreak = useMediaQuery('(max-width: 1300px)')

  const playerCards: PlayerCardData[] = [
    {
      id: 1,
      name: 'Erling Haaland',
      team: 'Manchester City',
      position: 'Forward',
      match: 'Arsenal',
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

  return (
    <div className="relative">
      {/* Decorative wave */}
      <div className="z-10 absolute top-0 right-0 -translate-y-[75%] xxs:-translate-y-[85%] -translate-x-[32vw] xxs:-translate-x-[13vw] xl:-translate-x-[18vw] inline-block">
        <svg
          width="60"
          height="61"
          viewBox="0 0 99 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sm:w-24 sm:h-24"
          aria-hidden="true"
        >
          <path
            d="M92.1647 34.5039C96.8664 37.9773 97.7035 44.8335 96.322 52.076C94.9062 59.4988 91.0436 68.1716 85.1432 76.4112C79.2429 84.6506 72.3092 91.0545 65.789 94.7072C59.425 98.2724 52.7403 99.5679 48.0286 96.0874C45.2572 94.04 43.8363 90.7883 43.4103 87.0902C43.1367 84.7149 43.2622 82.0796 43.7343 79.2869C41.266 80.6058 38.8355 81.5387 36.5241 82.0046C32.9252 82.73 29.4363 82.3531 26.6657 80.3065C22.7026 77.3787 21.4741 72.064 22.0129 66.1147C16.6063 68.4679 11.2502 68.9189 7.28698 65.9912C2.57538 62.5107 1.73047 55.6529 3.10944 48.4054C4.52234 40.98 8.38416 32.3068 14.2844 24.0673C20.1847 15.8278 27.1197 9.42387 33.6399 5.77114C40.0038 2.20615 46.6879 0.909939 51.3995 4.39039C55.3625 7.31788 56.5906 12.632 56.0521 18.5808C61.4585 16.2277 66.8151 15.7782 70.7782 18.7056C73.5488 20.7522 74.9765 24.0076 75.4087 27.7093C75.6864 30.0883 75.5638 32.7276 75.0935 35.5239C77.5626 34.2044 79.9943 33.2718 82.3063 32.8058C85.9052 32.0804 89.3942 32.4573 92.1647 34.5039Z"
            fill="#F9CC00"
            stroke="#262F3B"
            strokeWidth="4"
          />
        </svg>
      </div>
      <section
        className="bg-cream h-full min-h-screen border-none pt-8 sm:pt-16 pb-[200px] lg:pb-[250px] px-4 sm:px-8 relative overflow-hidden"
        style={{
          clipPath: isSmall
            ? isTiny
              ? 'polygon(0 0, 100% 0, 100% 100%, 0% 98%)'
              : 'polygon(0 0, 100% 0, 100% 100%, 0% 97%)'
            : 'polygon(0 0, 100% 0, 100% 100%, 0% 96.5%)',
        }}
      >
        <div className="max-w-7xl mx-auto h-full">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="flex flex-col items-center"
          >
            {/* Header Section */}
            <div className="w-full max-w-4xl mb-8 sm:mb-12">
              <IconGrid variants={itemVariants} />

              <motion.h2
                variants={itemVariants}
                className="mt-4 sm:mt-2 text-3xl sm:text-4xl lg:text-5xl text-center font-black text-dark-navy leading-tight px-4"
              >
                WIN UP TO 100X YOUR CASH. JUST PICK MORE OR LESS
              </motion.h2>
            </div>

            {/* Main Content */}
            <div className="w-full h-full relative">
              {/* Mobile Layout */}
              <div className={`${layoutBreak ? 'block' : 'hidden'}`}>
                <motion.div
                  variants={itemVariants}
                  className="text-center px-4 relative mb-6"
                >
                  <p className="text-lg font-cursive font-black text-dark-navy max-w-xs mx-auto">
                    Pick more or less on your favourite players stats
                  </p>

                  {/* Arrow */}
                  <AnimatedArrow
                    className="absolute top-15 right-[22%] md:right-[30%] "
                    pathData="M32.1095 2.01164C164.216 120.797 136.791 345.011 29.9283 336.957C-21.54 333.078 7.30394 250.072 55.9628 284.497C115.483 326.606 29.4788 355.726 27.4649 439.827M27.4649 439.827L20.053 426.701M27.4649 439.827L42.8678 426.193"
                    width="124"
                    height="444"
                    viewBox="0 0 124 444"
                    isInView={isInView}
                    delay={1}
                  />
                </motion.div>

                {/* Player Cards */}
                <div className="transform rotate-2 mb-24 sm:mb-20">
                  <motion.div
                    variants={itemVariants}
                    className="space-y-4 px-2 max-w-lg mx-auto"
                  >
                    {playerCards.map((player, index) => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        highlightCard={
                          index === 0 || index === 1 ? true : false
                        }
                        highlightMore={index === 0 ? true : false}
                        highlightLess={index === 1 ? true : false}
                        variants={itemVariants}
                      />
                    ))}
                  </motion.div>
                </div>
                {/* Entry Cards */}
                <motion.div
                  variants={itemVariants}
                  className="px-4 mb-[130px] relative"
                >
                  <div className="text-center mb-6 ">
                    <div className="flex flex-col items-center">
                      <span className="text-xl font-cursive font-bold text-dark-navy self-center">
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
                  </div>

                  <div className="flex flex-wrap gap-4 items-center justify-center -rotate-2">
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">Entry Amount</p>
                      <div className="bg-dark-navy text-text-primary font-bold text-xl px-6 py-4 rounded-lg">
                        ₦1,000
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">Potential Payout</p>
                      <div className="bg-dark-navy text-text-primary font-bold text-xl px-6 py-4 rounded-lg">
                        ₦3,000
                      </div>
                    </div>
                  </div>
                  {/* Arrow to withdraw */}
                  <AnimatedArrow
                    className="absolute -bottom-[50%] right-[25%] 3xs:-bottom-[70%] 3xs:right-[38%]"
                    pathData="M2.93972 0.999972C5.54805 15.0913 32.8525 51.3021 65.3429 43.0939C123.488 28.4044 116.378 76.1011 118.576 96.3548M118.576 96.3548L107.022 84.5251M118.576 96.3548L129.595 81.9628"
                    width="132"
                    height="100"
                    viewBox="0 0 132 100"
                    isInView={isInView}
                    delay={1.5}
                  />
                </motion.div>

                {/* Withdraw Section */}
                <div className="relative -rotate-12 ">
                  <div className="text-center mb-4 px-4 w-[50%] xs:w-[40%] text-center mx-auto ">
                    <span className="font-cursive font-bold text-xl text-dark-navy ">
                      Withdraw your winnings
                    </span>
                  </div>
                  <WithdrawCard variants={itemVariants} />
                </div>
              </div>

              {/* Desktop Layout */}
              <div
                className={`${layoutBreak ? 'hidden' : 'flex'} items-start gap-8`}
              >
                {/*  Player Cards */}
                <div className="flex-[2]">
                  <motion.div variants={itemVariants} className="relative mb-8">
                    <p className="text-2xl font-cursive font-black text-dark-navy -rotate-1 text-center max-w-xs mx-auto">
                      Pick more or less on your favourite players stats
                    </p>

                    {/* Arrow */}
                    <AnimatedArrow
                      className="absolute top-8 -right-40 w-60"
                      pathData="M1.37004 19.1816C94.6528 -26.8737 215.956 29.2278 190.256 82.9448C177.879 108.817 136.67 78.3885 165.757 59.6807C201.336 36.7969 239.06 92.7226 237.043 126.088M237.043 126.088L226.48 117.972M237.043 126.088L246.785 119.199"
                      width="248"
                      height="129"
                      viewBox="0 0 248 129"
                      isInView={isInView}
                      delay={1}
                    />
                  </motion.div>

                  <div className="rotate-2">
                    <motion.div
                      variants={itemVariants}
                      className="space-y-4 max-w-lg mx-auto"
                    >
                      {playerCards.map((player, index) => (
                        <PlayerCard
                          key={player.id}
                          player={player}
                          highlightCard={
                            index === 0 || index === 1 ? true : false
                          }
                          highlightMore={index === 0 ? true : false}
                          highlightLess={index === 1 ? true : false}
                          variants={itemVariants}
                        />
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Payout & Withdraw */}
                <div className="flex-[1] space-y-12 translate-y-[15%] -translate-x-[10%]">
                  <motion.div variants={itemVariants} className="relative">
                    <div className="text-center mb-6 ">
                      <div className="flex flex-col items-end">
                        <span className="text-xl font-cursive font-bold text-dark-navy self-center translate-x-[70%]">
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
                    </div>

                    <div className="flex gap-4 items-center justify-end transform -rotate-2 -translate-x-[10%]">
                      <div className="text-center">
                        <p className="text-gray-600 mb-2">Entry Amount</p>
                        <div className="bg-dark-navy text-text-primary font-bold text-xl px-6 py-4 rounded-lg">
                          ₦1,000
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 mb-2">Potential Payout</p>
                        <div className="bg-dark-navy text-text-primary font-bold text-xl px-6 py-4 rounded-lg">
                          ₦3,000
                        </div>
                      </div>
                    </div>

                    {/* Arrow to withdraw */}
                    <AnimatedArrow
                      className="absolute -bottom-[80%] right-1/4"
                      pathData="M35.9774 1.46289C26.8388 7.43816 9.41035 37.2747 24.7299 57.7007C52.1458 94.2552 16.5284 103.277 2.9375 110.775M2.9375 110.775L7.85693 99.176M2.9375 110.775L16.2926 114.29"
                      width="37"
                      height="116"
                      viewBox="0 0 37 116"
                      isInView={isInView}
                      delay={1.5}
                    />
                  </motion.div>

                  {/* Withdraw Section */}
                  <div className="relative pt-16">
                    <div className="absolute bottom-[20%] -left-[70%] w-[50%] text-center">
                      <span className="font-cursive font-bold text-2xl text-dark-navy ">
                        Withdraw your winnings
                      </span>
                    </div>
                    <div className="-rotate-3 sm:-rotate-12 -translate-x-[20%]">
                      <WithdrawCard variants={itemVariants} />
                    </div>

                    {/*  arrow to player cards */}
                    <AnimatedArrow
                      className="absolute bottom-[30%] -left-[90%]"
                      pathData="M188.233 84.8366C83.3599 59.6039 15.4684 74.4691 32.7633 102.73C43.7124 120.621 91.6394 84.5661 39.6628 48.5943C3.6012 23.6369 15.7444 -4.01267 15.7444 3.17483M15.7444 3.17483L26.7837 16.9387M15.7444 3.17483L1.94531 21.9851"
                      width="189"
                      height="110"
                      viewBox="0 0 189 110"
                      isInView={isInView}
                      delay={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="absolute bottom-[0%] left-0 w-full">
        <Banner />
      </div>
      <svg
        width="76"
        height="78"
        viewBox="0 0 76 78"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -bottom-[2.5%] md:-bottom-[2%] -left-[40%] w-full"
      >
        <path
          d="M5.82362 33.3766L5.82325 33.3757C4.88918 31.1519 4.62496 28.6451 5.55736 26.6594L5.65174 26.4694L5.65583 26.4614C6.88546 24.033 9.89452 22.7288 12.8656 22.7725C15.8605 22.8423 18.728 24.0025 21.7271 25.2287L23.2894 25.868L23.0976 24.1778C22.7754 21.3369 22.5405 18.598 23.3457 16.175L23.5201 15.6951C24.8251 12.4508 28.4819 10.2492 31.9499 10.6277C35.4303 11.0322 38.4837 13.9968 38.9935 17.4819L39.3388 19.8459L40.7729 17.9295C43.3172 14.5286 47.9651 12.8632 52.0422 13.8506L52.4348 13.9547C56.4741 15.1148 59.6569 18.9046 60.1768 23.1126L60.2188 23.5207C60.5762 27.8867 58.0061 32.3977 54.0853 34.3143L51.7438 35.4594L54.233 36.1809C58.0904 37.3 61.6155 39.6229 63.8541 42.8797L64.0672 43.198C66.2237 46.5179 66.9672 50.7851 65.7906 54.5077L65.6711 54.8661C64.3694 58.554 61.0199 61.4832 57.2589 61.9903L56.8929 62.0317L56.8911 62.0324C52.7251 62.4286 48.7807 60.0739 44.8577 57.5485L43.7277 56.8209L43.3584 58.1261C42.1772 62.2984 39.01 65.8721 35.0107 67.497C33.4008 68.1451 31.7072 68.467 30.1158 68.2282C28.3013 67.9518 26.6274 66.9574 25.1172 65.6679L25.1178 65.6666C18.9683 60.3795 16.8159 50.841 20.0682 43.3503L20.6957 41.9049L19.1334 41.9508C13.723 42.1088 8.34104 38.78 6.03687 33.858L5.82362 33.3766ZM30.5312 41.2166C30.7568 42.1392 31.0641 43.1883 31.5694 44.1179C32.0476 44.9976 32.7329 45.825 33.7424 46.3214L33.9487 46.4159L33.958 46.4205C35.2993 46.9784 36.7617 46.7797 37.9587 46.3517L38.1947 46.2632L38.1956 46.2628C40.8321 45.2222 43.0174 42.8884 43.7362 40.0647C44.4593 37.2238 43.5264 34.0026 41.2856 32.0987L41.2778 32.0925L41.2712 32.0867C40.6423 31.5722 39.8492 31.0576 38.8725 30.9068L38.8719 30.9081C37.6575 30.7144 36.4895 31.0586 35.5261 31.5714L35.1261 31.8008L35.1243 31.8016L34.71 32.0708C32.6936 33.4489 31.5649 35.2843 30.9794 36.9562C30.3697 38.6978 30.3196 40.3516 30.5316 41.2175L30.5312 41.2166Z"
          fill="#8E54D3"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}
