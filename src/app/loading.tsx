'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-navy">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative"
      >
        <svg
          width="80"
          height="76"
          viewBox="0 0 30 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Loading"
        >
          <motion.path
            d="M14.2924 0.942637C14.7387 0.578421 15.3978 0.604756 15.8139 1.02076L28.807 14.0139L28.8852 14.0999C29.2252 14.5165 29.2252 15.1188 28.8852 15.5354L28.807 15.6213L15.8139 28.6145L15.7279 28.6926C15.3113 29.0327 14.7091 29.0327 14.2924 28.6926L14.2065 28.6145L1.21329 15.6213C0.797269 15.2052 0.770902 14.5461 1.13517 14.0999L1.21329 14.0139L14.2065 1.02076L14.2924 0.942637ZM5.23087 14.8176L6.6547 16.2415C6.67482 16.2408 6.69495 16.2385 6.71525 16.2385H14.8246L14.9994 16.2473C15.8587 16.3348 16.5287 17.0603 16.5287 17.9426C16.5285 18.8248 15.8585 19.5505 14.9994 19.6379L14.8246 19.6467H10.06L15.0102 24.5969L24.7895 14.8176L23.3373 13.3655L23.2904 13.3684H15.1811C14.2398 13.3684 13.477 12.6056 13.477 11.6643C13.4771 10.7231 14.2398 9.96021 15.1811 9.96021H19.932L15.0102 5.03834L5.23087 14.8176Z"
            fill="none"
            stroke="url(#paint0_linear_stroke)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.4, 0.6, 1],
            }}
          />

          {/*  filled logo  */}
          <motion.path
            d="M14.2924 0.942637C14.7387 0.578421 15.3978 0.604756 15.8139 1.02076L28.807 14.0139L28.8852 14.0999C29.2252 14.5165 29.2252 15.1188 28.8852 15.5354L28.807 15.6213L15.8139 28.6145L15.7279 28.6926C15.3113 29.0327 14.7091 29.0327 14.2924 28.6926L14.2065 28.6145L1.21329 15.6213C0.797269 15.2052 0.770902 14.5461 1.13517 14.0999L1.21329 14.0139L14.2065 1.02076L14.2924 0.942637ZM5.23087 14.8176L6.6547 16.2415C6.67482 16.2408 6.69495 16.2385 6.71525 16.2385H14.8246L14.9994 16.2473C15.8587 16.3348 16.5287 17.0603 16.5287 17.9426C16.5285 18.8248 15.8585 19.5505 14.9994 19.6379L14.8246 19.6467H10.06L15.0102 24.5969L24.7895 14.8176L23.3373 13.3655L23.2904 13.3684H15.1811C14.2398 13.3684 13.477 12.6056 13.477 11.6643C13.4771 10.7231 14.2398 9.96021 15.1811 9.96021H19.932L15.0102 5.03834L5.23087 14.8176Z"
            fill="url(#paint0_linear_38_4246)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 1, 0.8, 0],
              filter: [
                'drop-shadow(0 0 0px #D0F091)',
                'drop-shadow(0 0 0px #D0F091)',
                'drop-shadow(0 0 8px #D0F091)',
                'drop-shadow(0 0 12px #D0F091)',
                'drop-shadow(0 0 0px #D0F091)',
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.4, 0.5, 0.6, 1],
            }}
          />

          {/*  sparks */}
          {/* {[...Array(8)].map((_, i) => (
            <motion.line
              key={i}
              x1={15}
              y1={14.5}
              x2={15 + Math.cos((i * 45 * Math.PI) / 180) * 15}
              y2={14.5 + Math.sin((i * 45 * Math.PI) / 180) * 15}
              stroke="#D0F091"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.1 + 1.5,
                ease: 'easeOut',
              }}
            />
          ))} */}

          <defs>
            <linearGradient
              id="paint0_linear_38_4246"
              x1="15.0103"
              y1="0.687805"
              x2="15.0103"
              y2="28.9477"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D0F091" />
              <stop offset="1" stopColor="#268609" />
            </linearGradient>
            <linearGradient
              id="paint0_linear_stroke"
              x1="15.0103"
              y1="0.687805"
              x2="15.0103"
              y2="28.9477"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D0F091" />
              <stop offset="1" stopColor="#268609" />
            </linearGradient>
          </defs>
        </svg>

        {/* ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-squad-green/40"
          style={{
            width: '100px',
            height: '100px',
            left: '-10px',
            top: '-12px',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </motion.div>
    </div>
  )
}
