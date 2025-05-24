"use client";

import { motion } from "framer-motion";

export function FloatingElements() {
  return (
    <>
      {/* Decorative floating elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 text-6xl opacity-30"
      >
        🎯
      </motion.div>

      <motion.div
        animate={{
          y: [0, 15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-40 right-20 text-4xl opacity-40"
      >
        ⚡
      </motion.div>

      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-40 left-20 text-5xl opacity-25"
      >
        💰
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-60 left-1/2 text-3xl opacity-35"
      >
        🚀
      </motion.div>

      {/* Geometric shapes */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-32 right-1/4 w-20 h-20 bg-gradient-to-r from-squad-purple/20 to-squad-pink/20 rounded-full"
      />

      <motion.div
        animate={{
          rotate: [0, -360],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-60 right-10 w-16 h-16 bg-gradient-to-r from-squad-blue/20 to-squad-green/20 rounded-2xl"
      />
    </>
  );
}
