// 'use client'

// import { PlayerCardProps } from '@/types'
// import { motion } from 'framer-motion'
// import Image from 'next/image'
// import { IoArrowDown, IoArrowUp } from 'react-icons/io5'

// export default function PlayerCard({
//   player,
//   index,
//   variants,
//   isStandalone = true,
// }: PlayerCardProps) {
//   return (
//     <motion.div
//       variants={variants}
//       className={`relative bg-card-dark py-3 px-3 lg:px-4 rounded-xl ${isStandalone ? 'shadow-lg' : 'shadow-none'} `}
//       whileHover={{ y: -4, scale: 1.02 }}
//       transition={{ duration: 0.3 }}
//       role="article"
//       aria-label={`Player stats for ${player.name}`}
//     >
//       <div className="flex items-start gap:1 sm:gap-2 w-full">
//         <div className="mr-2 lg:mr-3 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex-shrink-0">
//           <Image
//             src="/assets/onana.jpg"
//             className="object-cover w-10 h-10 lg:w-14 lg:h-14 rounded-full"
//             width={56}
//             height={56}
//             alt={`${player.name} profile`}
//           />
//         </div>

//         <div className="flex-1 min-w-0">
//           <h3 className="font-semibold sm:font-bold text-white text-sm lg:text-lg truncate">
//             {player.name}
//           </h3>
//           <p className="text-gray-400 text-[8px] sm:text-xs">
//             {player.team} - {player.position}
//           </p>
//           <p className="text-cream/80 text-[10px] sm:text-xs lg:text-sm">
//             vs {player.match} on
//           </p>
//           <p className="text-cream/80 text-[10px] sm:text-xs lg:text-sm">
//             {player.date}
//           </p>
//         </div>

//         <div className="self-center text-center bg-dark-navy rounded-md border border-cream/20 w-12 h-16 sm:w-16 sm:h-20 lg:w-20 lg:h-24 flex items-center justify-center flex-shrink-0">
//           <div>
//             <div className="text:base sm:text-lg lg:text-2xl font-black text-white">
//               {player.value}
//             </div>
//             <div className="text-[8px] sm:text-xs lg:text-sm text-gray-400">
//               {player.stat}
//             </div>
//           </div>
//         </div>

//         <div className="flex h-full flex-col gap-y-2 self-center ml-2">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className={`flex h-full flex-1 gap-1 lg:gap-2 items-center px-2 sm:px-3 lg:px-4 py-2 text-[10px] sm:text-xs lg:text-sm font-semibold rounded-md transition-colors ${
//               index === 0
//                 ? 'bg-light-green text-dark-navy'
//                 : 'bg-dark-navy/80 text-white'
//             }`}
//             aria-label={`Bet more on ${player.name}'s ${player.stat}`}
//           >
//             <span>More</span>
//             <IoArrowUp className="text-xs lg:text-base" />
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className={`flex h-full flex-1 gap-1 lg:gap-2 items-center justify-center px-2 sm:px-3 lg:px-4 py-2 text-[10px] sm:text-xs lg:text-sm font-semibold rounded-md transition-colors ${
//               index === 1
//                 ? 'bg-light-green text-dark-navy'
//                 : 'bg-dark-navy/80 text-white'
//             }`}
//             aria-label={`Bet less on ${player.name}'s ${player.stat}`}
//           >
//             <span>Less</span>
//             <IoArrowDown className="text-xs lg:text-base" />
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

'use client'

import { PlayerCardProps } from '@/types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { IoArrowDown, IoArrowUp } from 'react-icons/io5'

export default function PlayerCard({
  player,
  index,
  variants,
  isStandalone = true,
}: PlayerCardProps) {
  return (
    <motion.div
      variants={variants}
      custom={index}
      className={`relative bg-card-dark py-3 px-3 lg:px-4 rounded-xl border border-gray-700/30 transition-all duration-300 ${
        isStandalone ? 'shadow-lg hover:shadow-xl' : 'shadow-md hover:shadow-lg'
      }`}
      whileHover={{
        y: isStandalone ? -4 : -2,
        scale: isStandalone ? 1.02 : 1.01,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      role="article"
      aria-label={`Player stats for ${player.name} - ${player.value} ${player.stat}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          // Handle card selection if needed
        }
      }}
    >
      <div className="flex items-start gap-2 sm:gap-3 w-full">
        {/* Player Avatar */}
        <div className="mr-2 lg:mr-3 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex-shrink-0 overflow-hidden">
          <Image
            src="/assets/onana.jpg"
            className="object-cover w-full h-full"
            width={56}
            height={56}
            alt={`${player.name} profile picture`}
            loading="lazy"
            sizes="(max-width: 1024px) 40px, 56px"
          />
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0 space-y-0.5">
          <h3 className="font-semibold sm:font-bold text-white text-sm lg:text-lg truncate">
            {player.name}
          </h3>
          <p className="text-gray-400 text-[10px] sm:text-xs lg:text-sm">
            {player.team} - {player.position}
          </p>
          <div className="text-cream/80 text-[9px] sm:text-xs lg:text-sm space-y-0.5">
            <p>vs. {player.match} on</p>
            <p>{player.date}</p>
          </div>
        </div>

        {/* Stats Display */}
        <div className="self-center text-center bg-dark-navy rounded-lg border border-cream/20 w-12 h-16 sm:w-16 sm:h-20 lg:w-20 lg:h-24 flex items-center justify-center flex-shrink-0">
          <div className="space-y-1">
            <div className="text-base sm:text-lg lg:text-2xl font-black text-white leading-none">
              {player.value}
            </div>
            <div className="text-[8px] sm:text-xs lg:text-sm text-gray-400 leading-tight px-1">
              {player.stat}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex h-full flex-col gap-2 self-center ml-2 lg:ml-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-8 sm:h-10 lg:h-12 flex-1 gap-1 lg:gap-2 items-center justify-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-[9px] sm:text-xs lg:text-sm font-semibold rounded-md transition-all duration-200 bg-light-green text-dark-navy hover:bg-light-green/90 focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-2 focus:ring-offset-card-dark"
            aria-label={`Bet more than ${player.value} ${player.stat} for ${player.name}`}
          >
            <span>More</span>
            <IoArrowUp className="text-xs lg:text-base" aria-hidden="true" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-8 sm:h-10 lg:h-12 flex-1 gap-1 lg:gap-2 items-center justify-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-[9px] sm:text-xs lg:text-sm font-semibold rounded-md transition-all duration-200 bg-dark-navy/80 text-white hover:bg-dark-navy focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-card-dark"
            aria-label={`Bet less than ${player.value} ${player.stat} for ${player.name}`}
          >
            <span>Less</span>
            <IoArrowDown className="text-xs lg:text-base" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
