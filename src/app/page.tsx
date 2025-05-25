'use client'

import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Header />
      <main>
        <div className="bg-[url('/assets/bg1.png')] bg-cover">
          {/* <div> */}
          <HeroSection />

          <div className="relative flex rotate-[180deg] h-[60px] xs:h-[80px]">
            {Array(
              window.innerWidth > 1280
                ? 5
                : window.innerWidth > 1024
                  ? 4
                  : window.innerWidth > 768
                    ? 3
                    : window.innerWidth > 380
                      ? 2
                      : 1
            )
              .fill(null)
              .map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  viewBox="0 0 1000 100"
                >
                  <path
                    d="M500 4c-125 0-125 96-250 96S125 4 0 4V0h1000v4c-125 0-125 96-250 96S625 4 500 4Z"
                    fill="#FBFFF4"
                  ></path>
                </svg>
              ))}
          </div>

          <FeaturesSection />
          {/* </div> */}
        </div>
      </main>
      {/* <Footer /> */}
    </motion.div>
  )
}
