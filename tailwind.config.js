/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        background: "#EEEEEE",
        primary: '#37AFE1',
        secondary:'#F1F0E8',
        hover:'#4CC9FE',
      },
    },
  },
  plugins: [],
}

