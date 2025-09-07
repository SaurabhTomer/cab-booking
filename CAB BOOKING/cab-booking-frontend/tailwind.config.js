/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#b8d9ff',
          300: '#8ac2ff',
          400: '#5aa8ff',
          500: '#2f8bff',
          600: '#1f6ee6',
          700: '#1857b3',
          800: '#154a91',
          900: '#143f78',
        },
        accent: '#00C2A8',
        dark: '#0B1220',
        light: '#F7FAFC',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.08)'
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
}
