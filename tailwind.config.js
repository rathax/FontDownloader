/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin"

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addComponents }) {
      addComponents({
        ".wtf": {
          "@apply text-2xl": {},
        },
      })
    }),
  ],
}