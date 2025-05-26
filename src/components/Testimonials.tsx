import React from 'react'
import AnimatedArrow from '@/components/Feature/AnimatedArrow'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const isSmall = useMediaQuery('(max-width: 1024px)')

  return (
    <section className="min-h-screen">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative text-white/90 text-center px-2 xxs:px-4 mt-auto"
      >
        <h2 className="relative mx-auto w-[60%] xs:w-[40%] md:w-[60%] lg:w-fit text-2xl sm:text-3xl lg:text-5xl font-black leading-tight tracking-tight">
          <span className="relative w-fit">
            WORDS ON THE STREET
            <AnimatedArrow
              className="hidden lg:block absolute -bottom-[20%] -right-[7%]"
              pathData="M1.99432 10.0882C10.0353 11.2898 17.9495 13.3444 26.09 13.3444C30.9381 13.3444 35.7861 13.3444 40.6342 13.3444C44.7209 13.3444 49.4029 14.0121 53.3695 12.9103C58.466 11.4946 63.2172 9.39959 68.5649 8.9305C77.3037 8.16394 83.0001 12.8733 90.3451 16.6006C104.548 23.8078 120.034 13.6635 132.531 7.88129C153.878 -1.99603 177.735 6.79754 199.933 6.14466C208.865 5.88197 217.097 2.27344 226.091 2.27344C233.231 2.27344 240.37 2.27344 247.51 2.27344"
              width="249"
              height="21"
              viewBox="0 0 249 21"
              strokeWidth="3"
              isInView={isInView}
              delay={1}
            />
            <AnimatedArrow
              className="absolute -bottom-[20%] -right-[30%] xs:-right-[17%] md:-right-[7%] lg:hidden block"
              pathData="M2 7.111C7.43674 7.89681 12.7878 9.24058 18.2918 9.24058C21.5697 9.24058 24.8476 9.24058 28.1256 9.24058C30.8887 9.24058 34.0543 9.67724 36.7362 8.95663C40.1821 8.03075 43.3946 6.66061 47.0103 6.35381C52.9189 5.85247 56.7704 8.93246 61.7365 11.3702C71.3392 16.0838 81.8098 9.44924 90.2594 5.66761C104.693 -0.792293 120.824 4.95883 135.832 4.53184C141.871 4.36003 147.437 2 153.518 2C158.346 2 163.173 2 168 2"
              width="170"
              height="15"
              viewBox="0 0 170 15"
              strokeWidth="3"
              isInView={isInView}
              delay={1}
            />
          </span>
        </h2>
      </motion.div>
      <div className="flex flex-col gap-4 w-full items-center">
        <div className="flex gap-4 items-center w-full"></div>
        <div className="flex gap-4 items-center"></div>
      </div>
    </section>
  )
}

export default Testimonials
