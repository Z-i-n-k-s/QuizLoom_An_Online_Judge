/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBg: "#f8f9fa", 
        lightText: "#212529", 
        darkBg: "#121212", 
        darkText: "#f1f1f1", 
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

