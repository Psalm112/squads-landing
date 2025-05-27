import { ReactNode } from 'react'
import { Variants } from 'framer-motion'
export interface NavigationItem {
  name: string
  href: string
}

export interface SocialLink {
  name: string
  href: string
  icon: string
}

export interface Feature {
  icon: string
  title: string
  description: string
  color: string
}

export interface BettingCard {
  player: string
  stat: string
  value: string
  multiplier: string
}

export interface PlayerCardData {
  id: number | string
  name: string
  team: string
  position: string
  match: string
  date: string
  stat: string
  value: string
  avatar: string
}
export interface PlayerCardProps {
  player: PlayerCardData
  variants: Variants
  isStandalone?: boolean
  highlightMore?: boolean
  highlightLess?: boolean
  highlightCard?: boolean
}

export interface IconFeature {
  icon: ReactNode
  bgColor: string
  shape: 'square' | 'circle'
}

export interface AnimatedArrowProps {
  className?: string
  pathData: string
  width: string | number
  height: string | number
  viewBox: string
  isInView: boolean
  strokeWidth?: string
  stroke?: string
  delay?: number
}

export interface TestimonialCardProps {
  variant?: 'default' | 'image' | 'stats'
  className?: string
  content: string
  author: {
    name: string
    handle: string
    avatar: string
  }
  image?: string
  hashtag?: string
  delay?: number
}
