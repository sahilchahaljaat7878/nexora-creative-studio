/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#08080D",
          900: "#08080D",
          850: "#0B0B12",
          800: "#11111B",
          700: "#171725",
        },
        brand: {
          purple: "#8B5CF6",
          violet: "#A855F7",
          indigo: "#6366F1",
          pink: "#EC4899",
          cyan: "#22D3EE",
        },
        muted: "#A1A1AA",
      },
      fontFamily: {
        display: ['"Sora"', '"Noto Sans Devanagari"', "system-ui", "sans-serif"],
        sans: [
          '"Plus Jakarta Sans"',
          '"Noto Sans Devanagari"',
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        widest: "0.25em",
        mega: "0.4em",
      },
      boxShadow: {
        glow: "0 0 40px -12px rgba(139, 92, 246, 0.55)",
        "glow-lg": "0 0 90px -20px rgba(168, 85, 247, 0.45)",
        card: "0 24px 70px -30px rgba(0, 0, 0, 0.85)",
        inset: "inset 0 1px 0 0 rgba(255, 255, 255, 0.06)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
        "brand-gradient": "linear-gradient(120deg, #8B5CF6 0%, #A855F7 45%, #6366F1 100%)",
        "text-gradient": "linear-gradient(100deg, #FFFFFF 10%, #C4B5FD 50%, #8B5CF6 90%)",
        "radial-glow":
          "radial-gradient(circle at center, rgba(139,92,246,0.28) 0%, rgba(8,8,13,0) 68%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(-1deg)" },
          "50%": { transform: "translateY(-22px) rotate(1deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.06)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "pulse-glow": "pulse-glow 7s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        marquee: "marquee 32s linear infinite",
        "gradient-x": "gradient-x 8s ease infinite",
      },
    },
  },
  plugins: [],
};
