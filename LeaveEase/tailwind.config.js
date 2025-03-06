/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            darker: '#404258',  // Dark navy
            dark: '#474E68',    // Medium slate
            medium: '#6B728E',  // Bluish slate
            light: '#3C7EFC',   // Bright blue
            white: '#FFFFFF',   // White
          },
        },
      },
    },
    plugins: [],
  }