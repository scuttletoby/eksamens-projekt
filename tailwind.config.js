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
        'bgColor': '#f4f5fa',
        'blush': '#D45D79',
        'footer': '#261C2C',
        'contactColor': '#1d2943',
        'headerSidebar': '#261C2C',
        'dimGray': '#666666',
        'darkGray': '#555555',
        'deiftBlue': '#293B5F',
        'silver': '#AAAAAA',
        'checkmarkBg': '#fcf2f3',
        'contactGray': '#f9eaed',
      },
      'fontFamily': {
        'Archivo': ['Archivo', 'sans-serif'],
        'Lexend': ['Lexend', 'sans-serif'],
      },
      backgroundImage: {
        'background1': 'url("/images/bg1.jpg")',
        'background2': 'url("/images/contour.png")',
        'background3': 'url("/images/pattern2.png")',
      }
    },
  },
  plugins: [],
}
