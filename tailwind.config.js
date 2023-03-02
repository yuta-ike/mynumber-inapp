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
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
