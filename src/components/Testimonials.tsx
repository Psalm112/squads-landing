// src/components/Testimonials.tsx
import React from 'react'
import AnimatedArrow from '@/components/Feature/AnimatedArrow'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  TestimonialCard,
  StatsCard,
  LeaderboardCard,
} from '@/components/TestimonialCard'

function Testimonials() {
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const testimonialData = {
    leaderboard: {
      title: 'First time playing on squad. First of many🤛🏼',
      subtitle: '',
      leaderboard: [
        {
          name: 'Christian Nørgaard',
          avatar: '/assets/testimonials/christian.jpg',
          attempts: 49,
          score: 45,
          status: 'online' as const,
        },
        {
          name: 'Anthony Gordon',
          avatar: '/assets/testimonials/anthony.jpg',
          attempts: 33,
          score: 24,
          status: 'online' as const,
        },
        {
          name: 'Axel Tuanzebe',
          avatar: '/assets/testimonials/axel.jpg',
          attempts: 0,
          score: 0,
          status: 'online' as const,
        },
      ],
      author: {
        name: 'Viktor Leo',
        handle: '@ViktohLeo',
        avatar: '/assets/testimonials/viktoh.png',
      },
    },
    testimonials: [
      {
        content:
          "Broooo i just noticed squads used the picture of GOAT for Lionel Messi in their platform and it's bursting my brain 😂",
        author: {
          name: 'Izu Official',
          handle: '@Izu__Official',
          avatar: '/assets/testimonials/izu2.png',
        },
      },
      {
        content: 'Stay humble haaland after 0:4 defeat against spurs 🤗#MUTTOT',
        author: {
          name: 'UTD Trey',
          handle: '@UTDTrey',
          avatar: '/assets/testimonials/trey.png',
        },
        image: '/assets/testimonials/haaland-sad.png',
      },
      {
        content:
          'Them say nah squad money dey now o. I don leave ********* for you nah🚀🔥',
        author: {
          name: 'Jujubol',
          handle: '@Jujubol____',
          avatar: '/assets/testimonials/juju.png',
        },
      },
      {
        content: '3 Ws in a row for my picks jhor,🔥 Weekend go soft again 😎',
        author: {
          name: 'Def Not Holmes',
          handle: '@defnotholmes',
          avatar: '/assets/testimonials/holmes.png',
        },
        image: '/assets/testimonials/money-celebration.png',
      },
      {
        content:
          '@SquadsDFS is real gee is here 😂😂😂😂😂 😂🔥🔥🔥🔥🔥🔥🔥🔥🔥',
        author: {
          name: 'Ayomide',
          handle: '@Ayomide2986',
          avatar: '/assets/testimonials/ayomide.png',
        },
      },
      {
        content: 'Vandals have just done make 2k from squad platform too',
        author: {
          name: 'Opodo',
          handle: '@opodo',
          avatar: '/assets/testimonials/opodo.png',
        },
      },
      {
        content:
          'love this platform @Squad actually different from the people in our platform platform Implement so many big updates fr and',
        author: {
          name: 'Fadaik',
          handle: '@Fadaik',
          avatar: '/assets/testimonials/fadaik.png',
        },
      },
    ],
    stats: {
      title: 'THE RUN IN',
      description: "Remaining fixtures for the Premier League's top two...",
      stats: {
        team1: {
          name: 'Liverpool',
          logo: '/logos/liverpool.png',
          position: '1st',
          points: 73,
        },
        team2: {
          name: 'Arsenal',
          logo: '/logos/arsenal.png',
          position: '2nd',
          points: 62,
        },
      },
      fixtures: [],
      author: {
        name: '',
        handle: '@premierleague',
        avatar: '/assets/testimonials/pl.png',
      },
      hashtag: '#TheRunIn',
      image: '/assets/testimonials/epl.png',
    },
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <section className="min-h-screen py-20 overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative text-center px-2 xxs:px-4 mb-16"
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

      {/* Horizontal Scrolling Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative"
      >
        {/* First Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pt-2 pb-6 mb-8 px-4 sm:px-6 lg:px-8
                     scrollbar-hide scroll-smooth
                     [-webkit-overflow-scrolling:touch]
                     [&::-webkit-scrollbar]:hidden
                     [&::-webkit-scrollbar-track]:hidden
                     [&::-webkit-scrollbar-thumb]:hidden
                     [-ms-overflow-style:none]
                     [scrollbar-width:none]"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
          }}
        >
          <motion.div variants={cardVariants} className="flex-shrink-0">
            <LeaderboardCard
              {...testimonialData.leaderboard}
              className="w-[280px] sm:w-[320px] lg:w-[350px]"
            />
          </motion.div>

          <motion.div variants={cardVariants} className="flex-shrink-0">
            <TestimonialCard
              content={testimonialData.testimonials[0].content}
              author={testimonialData.testimonials[0].author}
              className="w-[280px] sm:w-[320px] lg:w-[350px]"
            />
          </motion.div>

          <motion.div variants={cardVariants} className="flex-shrink-0">
            <TestimonialCard
              content={testimonialData.testimonials[1].content}
              author={testimonialData.testimonials[1].author}
              image={testimonialData.testimonials[1].image}
              variant="image"
              className="w-[280px] sm:w-[320px] lg:w-[350px]"
            />
          </motion.div>

          <motion.div variants={cardVariants} className="flex-shrink-0">
            <TestimonialCard
              content={testimonialData.testimonials[2].content}
              author={testimonialData.testimonials[2].author}
              className="w-[280px] sm:w-[320px] lg:w-[350px]"
            />
          </motion.div>

          <motion.div variants={cardVariants} className="flex-shrink-0">
            <TestimonialCard
              content={testimonialData.testimonials[5].content}
              author={testimonialData.testimonials[5].author}
              className="w-[280px] sm:w-[320px] lg:w-[350px]"
            />
          </motion.div>
        </div>

        {/* Second Row */}
        <div
          className="flex gap-4 sm:gap-6 overflow-x-auto pt-2 pb-6 px-4 sm:px-6 lg:px-8
                     scrollbar-hide scroll-smooth
                     [-webkit-overflow-scrolling:touch]
                     [&::-webkit-scrollbar]:hidden
                     [&::-webkit-scrollbar-track]:hidden
                     [&::-webkit-scrollbar-thumb]:hidden
                     [-ms-overflow-style:none]
                     [scrollbar-width:none]"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
          }}
        >
          <motion.div
            variants={cardVariants}
            className="flex-shrink-0"
            transition={{ delay: 0.3 }}
          >
            <TestimonialCard
              content={testimonialData.testimonials[3].content}
              author={testimonialData.testimonials[3].author}
              image={testimonialData.testimonials[3].image}
              variant="image"
              className="w-[280px] sm:w-[320px] lg:w-[350px]"
            />
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="flex-shrink-0"
            transition={{ delay: 0.35 }}
          >
            <TestimonialCard
              content={testimonialData.testimonials[4].content}
              author={testimonialData.testimonials[4].author}
              className="w-[280px] sm:w-[320px] lg:w-[350px]"
            />
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="flex-shrink-0"
            transition={{ delay: 0.4 }}
          >
            <StatsCard
              {...testimonialData.stats}
              className="w-[280px] sm:w-[320px] lg:w-[350px]"
            />
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="flex-shrink-0"
            transition={{ delay: 0.45 }}
          >
            <TestimonialCard
              content="Broooo i just noticed squads used the picture of GOAT for Lionel Messi in their platform and it's bursting my brain 😂"
              author={{
                name: 'Izu Official',
                handle: '@Izu__Official',
                avatar: '/assets/testimonials/izu2.png',
              }}
              className="w-[280px] sm:w-[320px] lg:w-[350px]"
            />
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="flex-shrink-0"
            transition={{ delay: 0.5 }}
          >
            <TestimonialCard
              content={testimonialData.testimonials[6].content}
              author={testimonialData.testimonials[6].author}
              className="w-[280px] sm:w-[320px] lg:w-[350px]"
            />
          </motion.div>
        </div>

        {/* Gradient Overlays for Visual Effect */}
        <div className="absolute top-0 left-0 w-8 sm:w-12 lg:w-16 h-full bg-gradient-to-r from-dark-navy to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-8 sm:w-12 lg:w-16 h-full bg-gradient-to-l from-dark-navy to-transparent pointer-events-none z-10" />
      </motion.div>

      {/* Scroll Hint for Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.6 }}
        className="flex justify-center mt-8 lg:hidden"
      >
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="animate-pulse"
          >
            <path
              d="M8 12L12 8L16 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="rotate(90 12 12)"
            />
          </svg>
          <span>Swipe to see more</span>
        </div>
      </motion.div>
    </section>
  )
}

export default Testimonials
