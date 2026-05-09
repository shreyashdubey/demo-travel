import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        snow: "#F1E4CB",
        glacier: "#E7DAB9",
        mist: "#A8927A",
        pine: "#3A4A2F",
        slate: "#3E2E22",
        dusk: "#8B6B3F",
        alpenglow: "#B85A3E",
        night: "#1F1810",
        gold: "#C9943B",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        snowfall: {
          "0%": { transform: "translate3d(0,-10vh,0)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "100%": { transform: "translate3d(20px,110vh,0)", opacity: "0" },
        },
        ember: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        snowfall: "snowfall 14s linear infinite",
        ember: "ember 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
