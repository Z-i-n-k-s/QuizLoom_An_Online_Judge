/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'; // Import Tailwind's color palette

export default {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBg: "#f8f9fa", // Light mode background color
        lightText: "#212529", // Light mode text color
        darkBg: "#121212", // Dark mode background color
        darkText: "#f1f1f1", // Dark mode text color
        primary: colors.blue[700], // Primary color from Tailwind's default palette
        secondary: colors.yellow[500], // Secondary color from Tailwind's default palette
        btnbg: colors.blue[900],
      },
    },
  },
  plugins: [
    require('daisyui'), // Include daisyUI plugin
  ],
};
