/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '0',
    },
    extend: {
      colors: {
        'netflix-red': '#8B5CF6',
        'netflix-black': '#0F0F1A',
      },
    },
  },
  plugins: [],
}
