import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#080b11",
        surface: {
          50: "#f8fafc",
          100: "#f1f5f9",
          800: "#111726",
          850: "#0d1320",
          900: "#090d16",
          950: "#05070d",
        },
        brand: {
          emerald: {
            DEFAULT: "#10b981",
            light: "#34d399",
            dark: "#059669",
            glow: "rgba(16, 185, 129, 0.25)",
          },
          indigo: {
            DEFAULT: "#6366f1",
            light: "#818cf8",
            dark: "#4f46e5",
            glow: "rgba(99, 102, 241, 0.25)",
          },
          cyan: {
            DEFAULT: "#06b6d4",
            light: "#22d3ee",
            dark: "#0891b2",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-dark": "radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.12) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.15) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(6, 182, 212, 0.1) 0px, transparent 50%)",
      },
      boxShadow: {
        "glow-emerald": "0 0 25px -5px rgba(16, 185, 129, 0.3)",
        "glow-emerald-lg": "0 0 50px -10px rgba(16, 185, 129, 0.4)",
        "glow-indigo": "0 0 25px -5px rgba(99, 102, 241, 0.3)",
        "inner-glow": "inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
