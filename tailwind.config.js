/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        surface1: "#f1f3f4",
        primary: '#1a73e8',
        secondary: '#5CBBF6',
        background: '#e8eaed'
      }
    },
  },
  plugins: [],
}

