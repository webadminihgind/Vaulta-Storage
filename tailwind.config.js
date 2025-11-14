/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: "hsl(var(--primary) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
      },
      animation: {
        "fade-in": "fade-in 1s ease forwards",
        "glow": "glow 2s infinite",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        "glow": {
          "0%, 100%": { "text-shadow": "0 0 8px rgba(191,247,71,0.5)" },
          "50%": { "text-shadow": "0 0 20px rgba(191,247,71,1)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
