/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#172033',
        mist: '#f5f7fb',
        violet: { 50: '#f4f1ff', 100: '#e9e3ff', 500: '#7257e8', 600: '#6246d8', 700: '#4d36b7' },
      },
      boxShadow: { soft: '0 18px 50px rgba(35, 29, 70, .08)' },
    },
  },
  plugins: [],
}
