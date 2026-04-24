import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        cracker: {
          50: "#fdf8f0",
          100: "#faeedb",
          200: "#f3d6a8",
          300: "#ecba78",
          400: "#e19a4a",
          500: "#d37f2b",
          600: "#b66422",
          700: "#8f4c1d",
          800: "#6d3b1b",
          900: "#4d2a15",
        },
      },
      boxShadow: {
        soft: "0 4px 20px -6px rgba(120, 80, 30, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
