import { motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'
import { Button } from './ui/Button'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const Community: React.FC = () => {
  const isLG = useMediaQuery('(min-width: 1024px)')
  return (
    <section
      className="relative py-20 overflow-hidden max-w-7xl mx-auto"
      aria-labelledby="community-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-12 lg:mb-16 px-4"
      >
        <h2
          id="community-heading"
          className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight mb-4"
        >
          START WINNING
          <br />
          WITH THE SQUAD
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm sm:text-base mb-8 max-w-md mx-auto"
        >
          From signing up to winning your first entry, it only takes a few steps
        </motion.p>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            variant="secondary"
            size="lg"
            className="bg-light-green hover:bg-light-green/90 text-dark-navy font-semibold px-8 py-3 rounded-md transition-all duration-300 hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-light-green/50 focus:ring-offset-2 focus:ring-offset-dark-purple"
            aria-label="Read more blog posts"
          >
            Join the community
          </Button>
        </motion.div>
      </motion.div>

      {/* Cards Container */}
      <div className="bg-[#232D39] max-sm:mx-4 max-lg:max-w-[640px] max-lg:mx-auto lg:mx-0 rounded-xl p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div>
            <div className="flex max-lg:flex-col gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Register Card */}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-[#1F2935] border-2 border-[#232D39] rounded-xl w-full lg:w-[340px] lg:flex-shrink-0"
              >
                <div className="bg-[url('/assets/card1bg.png')] bg-cover bg-center p-4 sm:p-6 flex flex-col h-full w-full">
                  <div className="relative w-[80px] sm:w-[100px] h-[80px] sm:h-[100px] mb-4 sm:mb-6 ">
                    <Image
                      src="/assets/register.svg"
                      alt="Register"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 80px, 100px"
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <span className="inline-block bg-[#2F3843] text-center text-xs sm:text-sm font-medium px-2 sm:px-3 py-1.5 sm:py-2 rounded w-fit">
                      Register
                    </span>
                    <h3 className="text-white font-bold text-lg sm:text-xl">
                      Join the Squads Community
                    </h3>
                    <p className="text-[#B6B8BB] text-sm leading-relaxed">
                      Create your account in seconds with just your name and
                      email address
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Fund Wallet Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#1F2935] border border-[#232D39] rounded-xl flex-1"
              >
                <div className="bg-[url('/assets/card2bg.png')] bg-cover bg-center lg:pl-0 pb-[0_!important] h-full w-full p-4 sm:p-6 flex max-lg:flex-col-reverse sm:items-center gap-4 sm:gap-6">
                  <div className="relative w-full w-full lg:w-[200px] h-[290px] sm:h-[360px] md:h-[460px] lg:h-full flex-shrink-0">
                    <Image
                      src={`/assets/fundAccount${isLG ? '' : 'sm'}.svg`}
                      alt="Fund Account"
                      fill
                      className="lg:object-contain object-top object-cover lg:object-left"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 160px, 200px"
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3 lg:pb-4">
                    <span className="inline-block bg-[#2F3843] text-center text-xs sm:text-sm font-medium px-2 py-1.5 sm:py-2 rounded min-w-[70px] sm:min-w-[84px]">
                      Fund Wallet
                    </span>
                    <h3 className="text-white font-bold text-lg sm:text-xl">
                      Fund Your Account
                    </h3>
                    <p className="text-[#B6B8BB] text-sm leading-relaxed">
                      Deposit funds instantly using your preferred payment
                      method to create an entry. All our payment methods are
                      fast & secure.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex max-lg:flex-col gap-4 sm:gap-6">
              {/* Picks Card  */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-[#1F2935] border border-[#232D39] rounded-xl flex-1"
              >
                <div className="bg-[url('/assets/card3bg.png')] bg-cover bg-center p-4 sm:p-6 lg:pl-0 flex flex-col items-start gap-4 sm:gap-6 h-full w-full">
                  <div className="relative w-full h-[120px] sm:h-[160px] flex-shrink-0 overflow-hidden">
                    <Image
                      src="/assets/playerEntry.svg"
                      alt="Create Your Entry"
                      fill
                      className="object-contain object-left translate-x-0 lg:-translate-x-[7%] px-4 sm:px-6 lg:px-0"
                      sizes="(max-width: 640px) 100vw, 200px"
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3 px-4 sm:px-6">
                    <span className="inline-block bg-[#2F3843] text-center text-xs sm:text-sm font-medium px-2 sm:px-1 py-1.5 sm:py-2 rounded w-[70px] sm:w-[84px]">
                      Picks
                    </span>
                    <h3 className="text-white font-bold text-lg sm:text-xl">
                      Create your entry
                    </h3>
                    <p className="text-[#B6B8BB] text-sm leading-relaxed">
                      Browse the players market, pick more or less on available
                      players and create your entry.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Cash Out Card  */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-[#1F2935] border border-[#232D39] rounded-xl w-full lg:w-[340px] lg:flex-shrink-0"
              >
                <div className="bg-[url('/assets/card1bg.png')] bg-cover bg-center p-4 sm:p-6 pb-[0_!important] flex flex-col h-full w-full">
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <span className="inline-block bg-[#2F3843] text-center text-xs sm:text-sm font-medium px-2 sm:px-1 py-1.5 sm:py-2 rounded w-[70px] sm:w-[84px]">
                      Cash Out
                    </span>
                    <h3 className="text-white font-bold text-lg sm:text-xl">
                      Withdraw your winnings
                    </h3>
                    <p className="text-[#B6B8BB] text-sm leading-relaxed">
                      Your entry is looking green? Withdraw straight to your
                      bank account with ease
                    </p>
                  </div>
                  <div className="relative w-full h-[100px] sm:h-[120px] mt-auto">
                    <Image
                      src="/assets/cashOut1.svg"
                      alt="Withdraw Winnings"
                      fill
                      className="z-10 object-contain -translate-x-[10%]"
                      sizes="(max-width: 1024px) 100vw, 340px"
                    />
                    <Image
                      src="/assets/cashOut2.svg"
                      alt="Withdraw Winnings"
                      fill
                      className="z-20 object-contain"
                      sizes="(max-width: 1024px) 100vw, 340px"
                    />
                    <Image
                      src="/assets/cashOut3.svg"
                      alt="Withdraw Winnings"
                      fill
                      className=" object-contain"
                      sizes="(max-width: 1024px) 100vw, 340px"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Community
