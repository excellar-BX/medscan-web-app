/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-out forwards",
      },
    },
    screens: {
      sm: "640px",
      md: "758px",
      lg: "1024px",
      'custom': '1028px',
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
