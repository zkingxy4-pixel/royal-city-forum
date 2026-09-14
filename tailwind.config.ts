import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        royal: {
          red: "#FF0000",
          dark: "#8B0000",
          black: "#000000",
          ink: "#070708",
          panel: "#0d0d10",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 32px rgba(255, 0, 0, 0.28)",
        glowLg: "0 0 60px rgba(255, 0, 0, 0.35)",
      },
      backgroundImage: {
        "royal-gradient": "linear-gradient(180deg, #000000 0%, #1a0000 55%, #8B0000 140%)",
      },
    },
  },
  plugins: [],
};

export default config;
