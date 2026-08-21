/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0A0B0D",
        surface: "#12141A",
        "surface-raised": "#1B1E26",
        border: "#242832",
        ink: "#ECEDEF",
        "ink-muted": "#8B909B",
        "ink-faint": "#5A5F6B",
        accent: "#C9A227",
        "accent-soft": "#C9A22726",
        positive: "#34D399",
        "positive-soft": "#34D39926",
        negative: "#FB7185",
        "negative-soft": "#FB718526",
        demo: "#F59E0B",
        "demo-soft": "#F59E0B26",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "card-reveal": "card-reveal 0.5s ease-out backwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "card-reveal": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
