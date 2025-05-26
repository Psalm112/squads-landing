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
      className={`relative bg-card-dark py-3 px-3 lg:px-4 rounded-xl ${isStandalone ? 'shadow-lg' : 'shadow-none'} `}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      role="article"
      aria-label={`Player stats for ${player.name}`}
    >
      <div className="flex items-start gap:1 sm:gap-2 w-full">
        <div className="mr-2 lg:mr-3 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex-shrink-0">
          <Image
            src="/assets/onana.jpg"
            className="object-cover w-10 h-10 lg:w-14 lg:h-14 rounded-full"
            width={56}
            height={56}
            alt={`${player.name} profile`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold sm:font-bold text-white text-sm lg:text-lg truncate">
            {player.name}
          </h3>
          <p className="text-gray-400 text-[8px] sm:text-xs">
            {player.team} - {player.position}
          </p>
          <p className="text-cream/80 text-[10px] sm:text-xs lg:text-sm">
            vs {player.match} on
          </p>
          <p className="text-cream/80 text-[10px] sm:text-xs lg:text-sm">
            {player.date}
          </p>
        </div>

        <div className="self-center text-center bg-dark-navy rounded-md border border-cream/20 w-12 h-16 sm:w-16 sm:h-20 lg:w-20 lg:h-24 flex items-center justify-center flex-shrink-0">
          <div>
            <div className="text:base sm:text-lg lg:text-2xl font-black text-white">
              {player.value}
            </div>
            <div className="text-[8px] sm:text-xs lg:text-sm text-gray-400">
              {player.stat}
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col gap-y-2 self-center ml-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex h-full flex-1 gap-1 lg:gap-2 items-center px-2 sm:px-3 lg:px-4 py-2 text-[10px] sm:text-xs lg:text-sm font-semibold rounded-md transition-colors ${
              index === 0
                ? 'bg-light-green text-dark-navy'
                : 'bg-dark-navy/80 text-white'
            }`}
            aria-label={`Bet more on ${player.name}'s ${player.stat}`}
          >
            <span>More</span>
            <IoArrowUp className="text-xs lg:text-base" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex h-full flex-1 gap-1 lg:gap-2 items-center justify-center px-2 sm:px-3 lg:px-4 py-2 text-[10px] sm:text-xs lg:text-sm font-semibold rounded-md transition-colors ${
              index === 1
                ? 'bg-light-green text-dark-navy'
                : 'bg-dark-navy/80 text-white'
            }`}
            aria-label={`Bet less on ${player.name}'s ${player.stat}`}
          >
            <span>Less</span>
            <IoArrowDown className="text-xs lg:text-base" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// 'use client'

// import { useMediaQuery } from '@/hooks/useMediaQuery'
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
//       className="relative bg-card-dark px-4 py-4 xl:px-5 rounded-xl shadow-lg"
//       whileHover={{ y: -4, scale: 1.02 }}
//       transition={{ duration: 0.3 }}
//       role="article"
//       aria-label={`Player stats for ${player.name}`}
//     >
//       <div className="flex items-start gap-2 sm:gap-3 w-full">
//         {/* Player Avatar */}
//         <div className="flex-shrink-0 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14 xl:w-16 xl:h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500">
//           <Image
//             src="/assets/onana.jpg"
//             className="object-cover w-full h-full rounded-full"
//             width={64}
//             height={64}
//             alt={`${player.name} profile`}
//             sizes="(max-width: 375px) 32px, (max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
//           />
//         </div>

//         {/* Player Info */}
//         <div className="flex-1 min-w-0 mr-1 sm:mr-2">
//           <h3 className="font-bold text-white text-sm xl:text-lg leading-tight truncate">
//             {player.name}
//           </h3>
//           <p className="text-gray-400 text-xs mt-0.5">
//             {player.team} - {player.position}
//           </p>
//           <div className="mt-1 space-y-0.5">
//             <p className="text-cream/80 text-xs xl:text-sm">
//               vs {player.match} on
//             </p>
//             <p className="text-cream/80 text-xs xl:text-sm">{player.date}</p>
//           </div>
//         </div>

//         {/* Stats Box */}
//         <div className="flex-shrink-0 min-w-[52px] flex flex-col gap-y-2 xxs:flex-row items-center justify-end h-full">
//           <div className="max-xxs:p-2 bg-dark-navy rounded-md border border-cream/20  w-full xxs:w-18 xxs:h-20 xl:w-20 xl:h-24 xl:w-24 xl:h-28 flex flex-col gap-y-2 xxs:flex-row items-center justify-center">
//             <div className="text-center">
//               <div className="text-base xxs:text-lg xl:text-2xl font-bold xxs:font-black text-white leading-tight">
//                 {player.value}
//               </div>
//               <div className="text-xs xl:text-sm text-gray-400 leading-tight">
//                 {player.stat}
//               </div>
//             </div>
//           </div>
//           <div className="flex gap-2 xxs:hidden">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className={`flex gap-1 sm:gap-1.5 xl:gap-2 items-center px-1.5 xs:px-2 sm:px-3 xl:px-4 py-1 sm:py-1.5 xl:py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors min-w-[44px] sm:min-w-[52px] xl:min-w-[60px] justify-center ${
//                 index === 0
//                   ? 'bg-light-green text-dark-navy'
//                   : 'bg-dark-navy/80 text-white hover:bg-dark-navy'
//               }`}
//               aria-label={`Bet more on ${player.name}'s ${player.stat}`}
//             >
//               <span className="hidden xxs:inline">More</span>
//               <span className="xxs:hidden">+</span>
//               <IoArrowUp className="text-xs xl:text-base flex-shrink-0" />
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className={`flex gap-1 sm:gap-1.5 xl:gap-2 items-center px-1.5 xs:px-2 sm:px-3 xl:px-4 py-1 sm:py-1.5 xl:py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors min-w-[44px] sm:min-w-[52px] xl:min-w-[60px] justify-center ${
//                 index === 1
//                   ? 'bg-light-green text-dark-navy'
//                   : 'bg-dark-navy/80 text-white hover:bg-dark-navy'
//               }`}
//               aria-label={`Bet less on ${player.name}'s ${player.stat}`}
//             >
//               <span className="hidden xxs:inline">Less</span>
//               <span className="xxs:hidden">-</span>
//               <IoArrowDown className="text-xs xl:text-base flex-shrink-0" />
//             </motion.button>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div
//           className={`${isStandalone ? 'xxs:flex hidden' : 'flex'} flex-col gap-y-1 sm:gap-y-1.5 xl:gap-y-2 self-center ml-1 sm:ml-2`}
//         >
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className={`flex gap-1 sm:gap-1.5 xl:gap-2 items-center px-1.5 xs:px-2 sm:px-3 xl:px-4 py-1 sm:py-1.5 xl:py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors min-w-[44px] sm:min-w-[52px] xl:min-w-[60px] justify-center ${
//               index === 0
//                 ? 'bg-light-green text-dark-navy'
//                 : 'bg-dark-navy/80 text-white hover:bg-dark-navy'
//             }`}
//             aria-label={`Bet more on ${player.name}'s ${player.stat}`}
//           >
//             {isStandalone ? (
//               <>
//                 <span className="hidden xxs:inline">More</span>
//                 <span className="xxs:hidden">+</span>
//               </>
//             ) : (
//               <>
//                 <span className="inline">More</span>
//               </>
//             )}

//             <IoArrowUp className="text-xs xl:text-base flex-shrink-0" />
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className={`flex gap-1 sm:gap-1.5 xl:gap-2 items-center px-1.5 xs:px-2 sm:px-3 xl:px-4 py-1 sm:py-1.5 xl:py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors min-w-[44px] sm:min-w-[52px] xl:min-w-[60px] justify-center ${
//               index === 1
//                 ? 'bg-light-green text-dark-navy'
//                 : 'bg-dark-navy/80 text-white hover:bg-dark-navy'
//             }`}
//             aria-label={`Bet less on ${player.name}'s ${player.stat}`}
//           >
//             {isStandalone ? (
//               <>
//                 <span className="hidden xxs:inline">Less</span>
//                 <span className="xxs:hidden">-</span>
//               </>
//             ) : (
//               <>
//                 <span className="inline">Less</span>
//               </>
//             )}

//             <IoArrowDown className="text-xs xl:text-base flex-shrink-0" />
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   )
// }
