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
        "fade-in": "fade-in 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "slide-up": "slide-up 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "slide-down": "slide-down 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow": {
          "0%, 100%": { "text-shadow": "0 0 8px rgba(191,247,71,0.5)" },
          "50%": { "text-shadow": "0 0 20px rgba(191,247,71,1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.1)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
