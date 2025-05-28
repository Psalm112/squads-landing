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
  metadata?: {
    gameId: string
    gameStatus: string
    isLive: boolean
    league: string
    sport: string
    availableProps: number
    playerNumber: string | null
  }
}

export interface PlayerCardProps {
  player: PlayerCardData
  variants: Variants
  isStandalone?: boolean
  highlightMore?: boolean
  highlightLess?: boolean
  highlightCard?: boolean
  isLoading?: boolean
  onBetClick?: (action: 'more' | 'less', player: PlayerCardData) => void
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

export interface ApiPlayer {
  player: {
    id: string
    name: string
    imageUrl?: string
    position: string
    team: { id: string }
    number?: string | null
  }
  game: {
    isLive: boolean
    startDate: string
    homeTeam: { id: string; nickname: string }
    awayTeam: { id: string; nickname: string }
  }
  props: Array<{
    betPoints: number
    lines: Array<{ isAvailable: boolean }>
  }>
}

export interface ApiResponse {
  props: ApiPlayer[]
}
