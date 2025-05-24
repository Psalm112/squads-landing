"use client";

import { motion } from "framer-motion";

const categories = [
  {
    title: "DRIBBLE",
    icon: "⚽",
    color: "squad-pink",
  },
  {
    title: "SHOTS",
    icon: "🥅",
    color: "squad-green",
  },
  {
    title: "GOALIE SAVES",
    icon: "🧤",
    color: "squad-blue",
  },
  {
    title: "TACKLES",
    icon: "⚡",
    color: "squad-yellow",
  },
  {
    title: "FOULS",
    icon: "⚠️",
    color: "squad-orange",
  },
  {
    title: "GOALS",
    icon: "🎯",
    color: "squad-purple",
  },
];

export function Footer() {
  return (
    <footer className="bg-dark-navy py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sports Categories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`flex items-center space-x-2 px-4 py-2 bg-${category.color}/10 border border-${category.color}/20 rounded-full`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className={`text-${category.color} font-semibold text-sm`}>
                {category.title}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 text-sm"
        >
          <p>&copy; 2024 Squads. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
