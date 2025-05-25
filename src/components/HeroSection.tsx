'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { FloatingElements } from '@/components/FloatingElements'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background Elements */}
      <FloatingElements />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-[90vh] items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative rotate-[6deg] md:rotate-[4deg]">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-dark-green py-4 px-6 xs:py-6 xs:px-8 rounded-[24.12px] xs:rounded-[47.65px] inline-block transform border border-[2px] border-light-green"
              >
                <h1 className="text-2xl xs:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-dark-navy">
                  The New way to
                </h1>
              </motion.div>
            </div>
            <div className="relative max-md:translate-y-[-3px] rotate-[-3deg]  md:rotate-[-1deg]">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="z-15 bg-pink py-4 px-6 xs:py-6 xs:px-8 rounded-[24.12px] xs:rounded-[47.65px] inline-block transform  border border-[2px] border-light-pink"
              >
                <h1 className="text-2xl xs:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-dark-pink">
                  Win Money on Sports
                </h1>
              </motion.div>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12 max-w-md mx-auto"
          >
            <span className="text-xl md:text-2xl text-gray-300 ">
              Just pick <span className="font-bold">More</span> or &nbsp;
              <span className="font-bold">Less</span> on player stats and
            </span>
            <span className="text-xl md:text-2xl text-gray-300">
              &nbsp;win up to&nbsp;
              <span className="text-light-green">100X your cash!</span>
            </span>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Button
              size="lg"
              className="bg-light-green font-bold px-8 py-4 rounded-md text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Wanna play? Tap in
              <Image
                src="/assets/cash.png"
                alt="Play cash"
                width={20}
                height={20}
                className="ml-2"
              />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0"></div>
    </section>
  )
}
