import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideLeftToRight: {
          "0%": { width: "0%" },
          "10%": { width: "13%" },
          "100%": { width: "100%" },
        },
        opacityNoneTo100: {
          "0%, 50%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
      },
      animation: {
        slideLeftToRight: "slideLeftToRight 0.3s ease-in-out",
        opacityNoneTo100: "opacityNoneTo100 0.5s ease-in-out",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        amplusBlue: {
          DEFAULT: "#1e3a6e",
          50: "#eef1f7",
          100: "#d4dbe8",
          200: "#b9c5d9",
          300: "#9eafca",
          400: "#8399bb",
          500: "#6883ac",
          600: "#4e6d9d",
          700: "#34578e",
          800: "#1a417f",
          900: "#002b70",
        },
        amplusOrange: {
          DEFAULT: "#f47920",
          50: "#fff4e5",
          100: "#ffe4c2",
          200: "#ffd49f",
          300: "#ffc47c",
          400: "#ffb459",
          500: "#ffa436",
          600: "#ff9413",
          700: "#f08300",
          800: "#d17300",
          900: "#b26200",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
