/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      'dmt': '/fonts/MedievalSharp.ttf'
      },
      fontSize:{
        '3xl': ['48px']
      },
      colors: {
        'site-background': '#FFEBED',
        'defaultColor': '#120002',
      },
      screens:{
        md: '860px'
      }
    },
  },
  plugins: [],
}

