/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#0F172A', // Dark background
          800: '#1E293B', // Slightly lighter for components
          700: '#334155', // Border colors
          600: '#475569', // Muted text
          300: '#CBD5E1', // Light text
          100: '#F1F5F9', // Very light text
        }
      }
    },
  },
  plugins: [],
}
