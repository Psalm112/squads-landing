import React from 'react'
import { Button } from './ui/Button'
import { motion } from 'framer-motion'
import Image from 'next/image'
function CallToAction() {
  return (
    <section className="bg-[url('/assets/bg3sm.png')] md:bg-[url('/assets/bg3.png')] bg-contain bg-no-repeat bg-center min-h-screen p-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-12 lg:mb-16 px-4"
      >
        <h2
          id="community-heading"
          className="text-[#271437] text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight mb-4"
        >
          JOIN AN ECOSYSTEM THAT KEEPS GIVING
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[#402562] text-sm sm:text-base mb-8 max-w-md mx-auto"
        >
          Our values are more than just words—they are the guiding principles
          that shape our company culture, help us navigate challenges, and
          ensure we stay true to our purpose.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Button
            size="lg"
            variant="secondary"
            aria-label="Sign Up on Squads"
            className="text-[#2A343F] bg-light-green hover:bg-light-green/80 font-bold px-8 py-4 rounded-md text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            Sign Up on Squads
            <Image
              src="/assets/cash.png"
              alt="Play cash"
              width={20}
              height={20}
              className="ml-2"
            />
          </Button>
        </motion.div>
      </motion.div>
      <div></div>
    </section>
  )
}

export default CallToAction
