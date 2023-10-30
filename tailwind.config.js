/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      'colors': {
        'blush': '#D45D79',
      },
      'fontFamily': {
        'Archivo': ['sans-serif'],
        'Lexend': ['sans-serif'],
      }
    },
  },
  plugins: [],
}
