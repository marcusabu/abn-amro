/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Include your index.html file
    './src/**/*.{vue,js,jsx,ts,tsx}' // Include Vue and JavaScript/TypeScript files
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsla(160, 100%, 37%, 1)'
      }
    }
  },
  plugins: []
}
