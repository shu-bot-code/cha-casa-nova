/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8E9775", // O verde pastel
        accent: "#E28E8E",  // O rosa fumaça
        background: "#FAF9F6", // Off-white
      },
    },
  },
  plugins: [],
}