/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F57661",
        base: {
          black: "#212121",
        },
      },
      animation: {
        thinking: "thinking 1s ease-in-out infinite",
      },
      keyframes: {
        thinking: {
          "0%, 100%": { transform: "translateY(30%)" },
          "50%": { transform: "translateY(-30%)" },
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
