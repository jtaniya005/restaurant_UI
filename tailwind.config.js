/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        ink: {
          50:  '#FAF7F0',
          100: '#F0EAD8',
          200: '#DCD0B0',
          300: '#B8A878',
          400: '#8A7A4A',
          500: '#6B5D33',
          600: '#4A3F20',
          700: '#332A15',
          800: '#1F190D',
          900: '#120E08',
          950: '#0A0704',
        },
        gold: {
          200: '#F3E5B8',
          300: '#E8CC7E',
          400: '#D4AF37',
          500: '#C19A2E',
          600: '#9E7D22',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: 'translateY(28px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%, 100%': { opacity: 0.4 }, '50%': { opacity: 1 } },
      },
    },
  },
  plugins: [],
}
