# Squads Landing Page

A modern, responsive landing page for Squads - a sports betting platform that allows users to bet on player stats and win up to 100X their cash.

## 📋 Project Overview

Squads Landing Page is built with Next.js 15 and features a sleek, modern UI designed to convert visitors into users. The landing page showcases the platform's features, benefits, and unique selling propositions through engaging sections including hero banners, feature highlights, testimonials, and more.

## 🚀 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Form Validation**: [Zod](https://zod.dev/)
- **API Integration**: [TanStack Query](https://tanstack.com/query/latest)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Fonts**: Google Fonts (Inter, Poppins, Gloria Hallelujah)

## 🔧 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/squads-landing.git
   cd squads-landing
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Project Structure

```
src/
├── app/                  # Next.js app router structure
│   ├── api/              # API routes
│   ├── page.tsx          # Home page
│   ├── layout.tsx        # Root layout with metadata and font setup
│   ├── loading.tsx       # Loading state component
│   └── globals.css       # Global styles
├── components/           # UI components
│   ├── ui/               # Reusable UI components
│   ├── Feature/          # Feature section components
│   ├── TestimonialCard/  # Testimonial card components
│   └── icons/            # Custom SVG icons
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── providers/            # React context providers
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## 🎨 UI Design

The project features a custom design system with:

- Dark-themed interface with green and pink accents
- Custom animations for enhanced user experience
- Responsive design optimized for all device sizes
- Custom font integration (Inter, Poppins, and Gloria Hallelujah)
- SVG graphics and illustrations

## 🧩 Key Components

- **Header**: Navigation with mobile-responsive menu
- **HeroSection**: Primary call-to-action and value proposition
- **Features**: Highlights of the platform's key features
- **Players**: Showcase of player stats and betting options
- **WhyUs**: Benefits of using the platform
- **Testimonials**: User testimonials and social proof
- **Community**: Community engagement section
- **Blog**: Latest articles and updates
- **CallToAction**: Conversion-focused CTA section
- **Footer**: Site navigation, social links, and legal information

## 📱 Responsive Design

The landing page is fully responsive with breakpoints for:
- Mobile: < 480px
- Small devices: 480px - 767px
- Medium devices: 768px - 1023px
- Large devices: 1024px - 1279px
- Extra-large devices: ≥ 1280px

## 🔄 State Management

- React Query for server state management
- Zustand for client-side state management
- Custom hooks for media queries and other functionality

## 🚀 Deployment

The project is configured for deployment on Vercel:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 🧪 Development Tools

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

## 📄 License

This project is proprietary. All rights reserved.

## 👨‍💻 Developed By

Samuel Oyenuga
