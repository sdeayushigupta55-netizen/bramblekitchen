/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07070A",
        teal: "#47C6D9",
        gold: "#FFB86B",
        rose: "#FF4D6D",
      },
      boxShadow: { glow: "0 0 0 1px rgba(255,255,255,0.12), 0 24px 90px rgba(0,0,0,0.65)" },
    },
  },
  plugins: [],
};
