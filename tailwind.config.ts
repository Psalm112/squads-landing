import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-navy': '#1A222C',
        dark: '#141B23',
        'light-green': '#D0F091',
        'dark-green': '#12DD27',
        'dark-pink': '#540835',
        pink: '#FD89ED',
        'light-pink': '#FFC2F7',
        cream: '#FBFFF4',

        'squad-green': '#7ED321',
        'squad-pink': '#D63384',
        'squad-blue': '#4ECDC4',
        'squad-yellow': '#F7CA18',
        'squad-purple': '#9013FE',
        'squad-orange': '#FF6B35',

        // Background colors
        'dark-blue': '#34495E',
        'light-cream': '#F8F9FA',
        'card-dark': '#262f3b',

        // Semantic colors
        primary: {
          50: '#E8F5E8',
          100: '#C3E6C3',
          500: '#7ED321',
          600: '#6BB01E',
          700: '#5A9D1A',
        },
        secondary: {
          50: '#FDE8F1',
          500: '#D63384',
          600: '#C02A74',
        },
      },
      screens: {
        xs: '480px',
        xxs: '380px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        cursive: ['var(--font-gloria)', 'cursive'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(1deg)' },
          '66%': { transform: 'translateY(8px) rotate(-1deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
} satisfies Config
