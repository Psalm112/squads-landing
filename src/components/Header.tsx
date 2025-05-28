'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'

import {
  FaInstagram,
  FaTiktok,
  FaXmark,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'
import { LuMenu } from 'react-icons/lu'
import { Logo } from './icons'
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Partners', href: '/partners' },
  { name: 'How to play', href: '/how-to-play' },
  { name: 'FAQs', href: '/faqs' },
]

const socialLinks = [
  { name: 'Twitter', href: '#', icon: <FaXTwitter className="h-5 w-5" /> },
  { name: 'TikTok', href: '#', icon: <FaTiktok className="h-5 w-5" /> },
  { name: 'YouTube', href: '#', icon: <FaYoutube className="h-5 w-5" /> },
  { name: 'Instagram', href: '#', icon: <FaInstagram className="h-5 w-5" /> },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-navy/95 backdrop-blur-md'
          : isMobileMenuOpen
            ? 'bg-dark-navy/95 backdrop-blur-md'
            : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto px-4 sm:px-6 lg:px-20" aria-label="Top">
        <div className="flex h-16 items-center justify-between relative">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex md:items-center md:space-x-8">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-300  transition-colors duration-200 font-medium ${
                  index === 1 ? 'text-light-green' : 'hover:text-light-green'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="max-md:flex items-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2"
          >
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </motion.div>

          {/* Social Links - Desktop */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {socialLinks.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={item.name}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-white"
            >
              {isMobileMenuOpen ? (
                <FaXmark className="h-6 w-6" />
              ) : (
                <LuMenu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-white/10 mt-2 pt-4 pb-3"
            >
              <div className="space-y-1">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-gray-300 hover:bg-white/5 rounded-md transition-colors duration-200 ${
                      index === 1
                        ? 'text-light-green'
                        : 'hover:text-light-green'
                    }`}
                    // onClick={()-}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-white/10 mt-4">
                {socialLinks.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-white"
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
