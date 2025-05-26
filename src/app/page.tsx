'use client'

import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
// import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Features from '@/components/Feature'
import Players from '@/components/Players'
import WhyUs from '@/components/WhyUs'
import Testimonials from '@/components/Testimonials'
export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen overflow-x-hidden"
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

          <Features />
          <div className="h-[40vh] md:h-[60vh] px-8 flex items-center justify-center md:justify-start">
            <div className="relative text-white/70 text-center md:text-left space-y-8 md:space-y-10 px-2 xxs:px-4 md:ml-[10vw]">
              <h2 className="md:w-[20vw] text-2xl sm:text-3xl lg:text-5xl font-black leading-tight">
                NUMEROUS PLAYER&nbsp;
                <span className="font-cursive text-light-green">
                  projections
                </span>
              </h2>
              <p className=" md:w-[30vw] 4xl:w-[30vw] max-md:mx-auto">
                Available player stats categories for you to pick from: Shots,
                goals, assists, saves, passes, and more
              </p>
              <svg
                width="31"
                height="32"
                viewBox="0 0 31 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden md:block absolute top-1/2 -right-[100%] translate-y-1/2"
              >
                <path
                  d="M2.71016 14.5724C1.47506 16.4669 2.16064 18.7875 3.0723 20.4441C4.09967 22.3109 5.84331 24.2073 8.01104 25.7886C10.1787 27.3698 12.5173 28.4516 14.6098 28.8591C16.5288 29.2327 19.0437 29.157 20.4496 27.2299C21.2667 26.1098 21.3568 24.7911 21.1389 23.6386C22.3045 23.4932 23.5333 23.0026 24.3499 21.8831C25.0644 20.9035 25.2365 19.7983 25.1076 18.72C26.1735 18.5135 27.1732 18.0126 27.8876 17.0334C29.2935 15.1061 28.5975 12.6883 27.6556 10.975C26.6286 9.10682 24.8849 7.20959 22.7172 5.62833C20.5496 4.04709 18.2105 2.96606 16.1179 2.55861C14.1989 2.18499 11.6839 2.26061 10.2781 4.18782L10.1499 4.37352C9.54326 5.30562 9.40026 6.3397 9.52097 7.3501C8.45483 7.55664 7.45492 8.05802 6.74038 9.03754L6.59382 9.25337C5.91283 10.3254 5.84615 11.5526 6.04977 12.6339C4.8834 12.7788 3.65337 13.2695 2.83607 14.3898L2.71016 14.5724Z"
                  fill="#F9CC00"
                  stroke="#262F3B"
                  strokeWidth="4"
                />
              </svg>
            </div>
          </div>
        </div>
        <Players />
        <div
          className="min-h-[100vh] pb-24 flex flex-col gap-y-[130px] xl:gap-y-[250px]"
          style={{
            backgroundImage: "url('/assets/bg2.png')",
            backgroundSize: '100% auto',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <WhyUs />
          <Testimonials />
        </div>
      </main>
    </motion.div>
  )
}
