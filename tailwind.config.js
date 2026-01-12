// tailwind.config.js
import daisyui from "daisyui";
import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      colors: {
        "amber-glow": {
          50: "#fef4e6",
          100: "#fde9ce",
          200: "#fbd49d",
          300: "#fabe6b",
          400: "#f8a93a",
          500: "#f69309",
          600: "#c57607",
          700: "#945805",
          800: "#623b04",
          900: "#311d02",
          950: "#221501",
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#f69309",      // amber-glow-500
          secondary: "#fabe6b",    // amber-glow-300
          accent: "#f8a93a",       // amber-glow-400
          "base-100": "#ffffff",   // White background
          "base-200": "#fef4e6",   // amber-glow-50 (very light)
          "base-300": "#fde9ce",   // amber-glow-100
          "base-content": "#311d02", // amber-glow-900 (dark text)
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#f69309",      // amber-glow-500
          secondary: "#fabe6b",    // amber-glow-300
          accent: "#f8a93a",       // amber-glow-400
          "base-100": "#221501",   // amber-glow-950 (darkest)
          "base-200": "#311d02",   // amber-glow-900
          "base-300": "#623b04",   // amber-glow-800
          "base-content": "#fde9ce", // amber-glow-100 (light text)
        },
      },
    ],
  },
});
