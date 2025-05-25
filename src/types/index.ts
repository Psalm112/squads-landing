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

export interface PlayerCard {
  id: number
  name: string
  team: string
  position: string
  match: string
  date: string
  stat: string
  value: string
  avatar: string
}

export interface IconFeature {
  icon: string
  bgColor: string
  borderColor: string
}
