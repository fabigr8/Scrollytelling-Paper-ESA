/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#06080F',
        surface: '#0E1220',
        elevated: '#161B2E',
        border: '#1E2A45',
        primary: '#4F72FF',
        accent: '#00D4FF',
        gold: '#F59E0B',
        danger: '#F87171',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
