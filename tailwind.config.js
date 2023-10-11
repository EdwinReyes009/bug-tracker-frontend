/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yummy: {
          400: '#35d0c7',
          600: '#35d0c7',
          800: '#3cb4bc',
        }
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwindcss-animated')
  ],
}