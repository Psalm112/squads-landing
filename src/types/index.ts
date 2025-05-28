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

// API Error types
export interface ApiErrorInfo {
  type: 'rate-limit' | 'timeout' | 'validation' | 'service' | 'unknown'
  message: string
  retryAfter?: number
  status?: number
  code?: string
  recoverable: boolean
}

// Performance metrics types
export interface ApiMetrics {
  requests: number
  successfulRequests: number
  failedRequests: number
  totalResponseTime: number
  avgResponseTime: number
  successRate: number
  lastRequestTime: number
  cacheHitRate: number
  cacheHits: number
  cacheMisses: number
}

export interface PerformanceReport extends ApiMetrics {
  status: 'excellent' | 'good' | 'fair' | 'poor'
}

// Network status types
export interface NetworkStatus {
  isOnline: boolean
  connectionType: string
  isSlowConnection: boolean
  isFastConnection: boolean
}

// Health check types
export interface ApiHealthStatus {
  isHealthy: boolean
  isOnline: boolean
  responseTime: number
  cacheStatus?: string
  isChecking: boolean
  lastCheck: number
  checkHealth: () => void
}
