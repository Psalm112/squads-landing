export interface NavigationItem {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface BettingCard {
  player: string;
  stat: string;
  value: string;
  multiplier: string;
}
