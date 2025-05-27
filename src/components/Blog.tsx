import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/Button'

function Blog() {
  return (
    <section className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="text-center flex flex-col gap-y-3">
        <h3 className="text-white text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight">
          Latest from the&nbsp;
          <span className="font-cursive text-light-green">Gang</span>
        </h3>
        <p className="text-cream/80">Subscribe to get latest yap from Wadmin</p>
      </div>
      <div></div>
    </section>
  )
}

export default Blog
