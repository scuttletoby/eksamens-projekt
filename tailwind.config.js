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
        'footer': '#261C2C',
      },
      'fontFamily': {
        'Archivo': ['sans-serif'],
        'Lexend': ['sans-serif'],
      },
      backgroundImage: {
        'background1': 'url("/images/bg1.jpg")',
        'background2': 'url("/images/contour.png")',
      }
    },
  },
  plugins: [],
}
