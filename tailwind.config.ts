/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        colors,
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
      transform: ['responsive', 'motion-safe', 'motion-reduce'],
    },
  },
}

