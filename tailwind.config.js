/** @type {import('tailwindcss').Config} */
export default {  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#EEEEEE",
        primary: '#37AFE1',
        secondary: '#808080',
        hover: '#4CC9FE',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}