import React from 'react'
import { Boot, Dribble, Foul, Glove, Shot } from './icons'

const bannerItems = [
  { title: 'Dribble', icon: <Dribble className="w-6 h-6" /> },
  { title: 'Shots', icon: <Shot className="w-6 h-6" /> },
  { title: 'Goalie-Saves', icon: <Glove className="w-6 h-6" /> },
  { title: 'Tackles', icon: <Boot className="w-6 h-6" /> },
  { title: 'Fouls', icon: <Foul className="w-6 h-6" /> },
  { title: 'Goalie-Saves', icon: <Glove className="w-6 h-6" /> },
]

const Banner = () => {
  return (
    <div className="relative w-[105vw] translate-x-[-2.5vw]">
      <div className="rotate-[3deg] bg-dark-green py-2">
        <div className="animate-marquee whitespace-nowrap flex gap-4 px-4">
          {[...Array(2)].flatMap((_, idx) =>
            bannerItems.map((item, i) => (
              <div
                key={`${item.title}-${idx}-${i}`}
                className="flex items-center gap-4 text-dark-navy font-black text-xl uppercase"
              >
                {item.title}
                <span>{item.icon}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Banner
