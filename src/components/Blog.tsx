import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/Button'

const blogPosts = [
  {
    id: 1,
    category: 'News',
    categoryColor: 'text-[#218208]',
    title: 'Introducing: The new way to win money on sports.',
    description:
      'Lorem ipsum dolor sit amet consectetur. Massa a nec leo arcu sed netus. Feugiat diam aliquam sapien.',
    image: '/assets/blog/sneaky-cash-card.png',
    imagePosition: 'object-top',
    gradient: 'from-purple-900 to-purple-800',
  },
  {
    id: 2,
    category: 'Tips',
    categoryColor: 'text-pink',
    title:
      'From signing up to enjoying our sweet benefit, it only takes a few...',
    description:
      'Lorem ipsum dolor sit amet consectetur. Massa a nec leo arcu sed netus. Feugiat diam aliquam sapien.',
    image: '/assets/blog/deposit-boost-card.png',
    imagePosition: 'object-left-top',
    gradient: 'from-purple-800 via-purple-900 to-pink-900',
  },
  {
    id: 3,
    category: 'News',
    categoryColor: 'text-[#6DE0E7]',
    title: 'Squads Game: Win real money with your football knowledge',
    description:
      'Lorem ipsum dolor sit amet consectetur. Massa a nec leo arcu sed netus. Feugiat diam aliquam sapien.',
    image: '/assets/blog/squads-game-card.png',
    imagePosition: 'object-top',
    gradient: 'from-purple-900 via-indigo-900 to-purple-800',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const cardHoverVariants = {
  hover: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

function Blog() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        className="text-center flex flex-col gap-y-3 mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-white text-3xl lg:text-5xl max-sm:max-w-[60vw] mx-auto font-bold leading-tight">
          Latest from the&nbsp;
          <span className="font-cursive text-light-green">Gang</span>
        </h2>
        <p className="text-cream/80 text-sm sm:text-base">
          Subscribe to get latest yap from Wadmin
        </p>
      </motion.div>

      {/* Blog Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {blogPosts.map((post) => (
          <motion.article
            key={post.id}
            className="group cursor-pointer"
            variants={itemVariants}
            whileHover="hover"
          >
            {/* Card Image */}
            <motion.div
              className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${post.gradient} mb-4 aspect-[16/8] sm:aspect-[4/2]`}
              variants={cardHoverVariants}
            >
              <div className="absolute inset-0 bg-black/20" />
              <Image
                src={post.image}
                alt={post.title}
                fill
                className={`${post.imagePosition} object-cover transition-transform duration-700 group-hover:scale-110`}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={post.id === 1}
              />

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-6 h-6 bg-light-green/20 rounded-full" />
              <div className="absolute bottom-6 left-4 w-3 h-3 bg-pink-400/30 rounded-full" />
            </motion.div>

            {/* Card Content */}
            <div className="space-y-3">
              <span
                className={`text-xs sm:text-sm font-semibold uppercase tracking-wider ${post.categoryColor}`}
                role="text"
                aria-label={`Category: ${post.category}`}
              >
                {post.category}
              </span>

              <h3 className="text-text-primary text-lg sm:text-xl font-bold leading-snug line-clamp-2 group-hover:text-light-green transition-colors duration-300">
                {post.title}
              </h3>

              <p className="text-text-gray text-sm sm:text-base leading-relaxed line-clamp-3">
                {post.description}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Button
          variant="secondary"
          size="lg"
          className="bg-light-green hover:bg-light-green/90 text-[#2A343F] font-semibold px-8 py-3 rounded-md transition-all duration-300 hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-light-green/50 focus:ring-offset-2 focus:ring-offset-dark-purple"
          aria-label="Read more blog posts"
        >
          Read more on blog
        </Button>
      </motion.div>
    </section>
  )
}

export default Blog
