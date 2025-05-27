import { motion } from 'framer-motion'
import React from 'react'

function Community() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative text-text-primary text-center space-y-4 md:space-y-6 px-2 xxs:px-4 mb-12 lg:mb-20"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
          START WINNING WITH THE SQUAD
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
    </section>
  )
}

export default Community
