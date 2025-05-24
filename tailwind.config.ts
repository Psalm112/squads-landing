import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors from design
        "squad-green": "#00FF7F",
        "squad-pink": "#FF69B4",
        "squad-blue": "#00BFFF",
        "squad-yellow": "#FFD700",
        "squad-purple": "#9370DB",
        "squad-orange": "#FF6347",

        // Background colors
        "dark-navy": "#1A1B2E",
        "dark-blue": "#16213E",
        "light-cream": "#F5F5DC",

        // Semantic colors
        primary: {
          50: "#E6FFE6",
          100: "#B3FFB3",
          500: "#00FF7F",
          600: "#00E66F",
          700: "#00CC5F",
        },
        secondary: {
          50: "#FFE6F7",
          500: "#FF69B4",
          600: "#E55AA0",
        },
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
} satisfies Config;
