/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-purple': '#9b72ff',
        'pastel-purple-light': '#c2abff',
        'pastel-mint': '#cafff5',
        'pastel-lavender': '#e2d5ff',
        'pastel-peach': '#ffe8cc',
        'pastel-peach-dark': '#fdb17c',
        'pastel-pink': '#ffd5e1',
        'accent-orange': '#ea580c',
        'accent-teal': '#0d9488',
      },
      fontFamily: {
        'display': ['"Bebas Neue"', 'sans-serif'],
        'heading': ['"Outfit"', 'sans-serif'],
        'body': ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
