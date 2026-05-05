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
        snow: "#F6F4EF",
        glacier: "#E8EEF2",
        mist: "#B8C2C9",
        pine: "#1F3A2E",
        slate: "#243240",
        dusk: "#7B5E57",
        alpenglow: "#E8895C",
        night: "#0B1320",
        gold: "#C9A26A",
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
