/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    safelist: ['grid', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6']
  },
  theme: {
    extend: {
      colors: {
        'custom-gray': 'rgb(249, 250, 251)'
      }
    }
  },
  plugins: []
}
