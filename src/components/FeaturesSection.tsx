"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const features = [
  {
    icon: "🎯",
    title: "Simple Picks",
    description: "Just pick MORE or LESS on player stats",
    color: "squad-pink",
  },
  {
    icon: "💰",
    title: "Big Wins",
    description: "Win up to 100X your cash",
    color: "squad-green",
  },
  {
    icon: "⚡",
    title: "Fast Payouts",
    description: "Get your winnings instantly",
    color: "squad-blue",
  },
  {
    icon: "🛡️",
    title: "Secure",
    description: "Your money is safe with us",
    color: "squad-yellow",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-light-cream py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-dark-navy mb-6">
            WIN UP TO 100X YOUR CASH. JUST PICK MORE OR LESS
          </h2>

          {/* Feature Icons Row */}
          <div className="flex justify-center items-center space-x-4 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ scale: 0, rotate: -180 }}
                animate={
                  isInView
                    ? { scale: 1, rotate: 0 }
                    : { scale: 0, rotate: -180 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`w-16 h-16 rounded-2xl bg-${feature.color}/20 flex items-center justify-center text-2xl`}
              >
                {feature.icon}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* App Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Demo Cards */}
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-squad-green rounded-full opacity-20 animate-pulse-slow" />
            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-squad-pink rounded-full opacity-20 animate-float" />

            {/* Main demo image/mockup */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
              <div className="text-center mb-6">
                <p className="text-squad-green font-medium mb-2">
                  Pick MORE or LESS on your favourite players
                </p>
              </div>

              {/* Mock betting cards */}
              <div className="space-y-4">
                {[
                  {
                    player: "Erling Haaland",
                    stat: "Goals",
                    value: "2.5",
                    multiplier: "2x",
                  },
                  {
                    player: "Kevin De Bruyne",
                    stat: "Assists",
                    value: "1.5",
                    multiplier: "3x",
                  },
                  {
                    player: "Bukayo Saka",
                    stat: "Shots",
                    value: "4.5",
                    multiplier: "2.5x",
                  },
                ].map((bet, index) => (
                  <motion.div
                    key={bet.player}
                    initial={{ opacity: 0, x: -50 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                    }
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-squad-blue to-squad-purple rounded-full" />
                      <div>
                        <p className="font-semibold text-dark-navy">
                          {bet.player}
                        </p>
                        <p className="text-sm text-gray-600">{bet.stat}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{bet.value}</p>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-squad-green text-white rounded-lg text-sm font-medium">
                          MORE
                        </button>
                        <button className="px-3 py-1 bg-squad-pink text-white rounded-lg text-sm font-medium">
                          LESS
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Payout section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-6 p-4 bg-gradient-to-r from-squad-yellow/20 to-squad-orange/20 rounded-xl text-center"
              >
                <p className="text-lg font-bold text-dark-navy">
                  Potential Win:{" "}
                  <span className="text-squad-green">₦3,000</span>
                </p>
                <p className="text-sm text-gray-600">100X your stake!</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
