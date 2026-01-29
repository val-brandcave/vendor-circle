import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Use class-based dark mode strategy
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand color - #2652B1 (used for all user types)
        primary: {
          50: "#f0f4fb",
          100: "#e1e9f7",
          200: "#c3d3ef",
          300: "#a5bde7",
          400: "#7a98d6",
          500: "#4f73c5",
          600: "#3d5fa8",
          DEFAULT: "#2652B1",
          700: "#1d3f8f",
          800: "#153070",
          900: "#0d1a51",
          foreground: "#ffffff",
        },
        // Secondary color for accent elements
        secondary: {
          50: "#f5f3ff",
          100: "#ebe7ff",
          200: "#d7cfff",
          300: "#c3b7ff",
          400: "#a599ff",
          500: "#8872ff",
          600: "#7659ff",
          DEFAULT: "#6b46c1",
          700: "#5a3fa1",
          800: "#493880",
          900: "#2d2263",
          foreground: "#ffffff",
        },
        // Destructive/danger color
        destructive: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          DEFAULT: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          foreground: "#ffffff",
        },
        // Success color for positive states
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          DEFAULT: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#145231",
          foreground: "#ffffff",
        },
        // Warning color for alerts
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          DEFAULT: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          foreground: "#000000",
        },
      },
      animation: {
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

