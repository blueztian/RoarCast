import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        roar: {
          yellow: "#FFB800",
          amber: "#B67500",
          maroon: "#710000",
        },
        ink: {
          DEFAULT: "#1C1A17",
          soft: "#4A463F",
          faint: "#8A8477",
        },
        paper: {
          DEFAULT: "#FBFAF7",
          dim: "#F3F0E8",
          line: "#E7E2D5",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        capsule: "0 1px 2px rgba(28, 26, 23, 0.04), 0 8px 24px rgba(28, 26, 23, 0.06)",
        card: "0 1px 2px rgba(28, 26, 23, 0.04), 0 12px 32px rgba(28, 26, 23, 0.07)",
        glow: "0 0 40px rgba(255, 184, 0, 0.25)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
