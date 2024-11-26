/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'textblack':"#1E1E1E",
        'borderoutline': "#AAAAAA",
        'buttonoutline': "#2A60A7",
        'pricingbackground': "#0F0F0F",
        'white':"#FFFFFF"
      },
      fontFamily:{
        'montserrat':['Montserrat']
      }
    },
  },
  plugins: [],
}