/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        ink: {
          50:  '#F7F5F2',
          100: '#EDE9E3',
          200: '#D5CFC6',
          300: '#B8B0A4',
          500: '#7A7265',
          700: '#3D3830',
          900: '#1A1612',
        },
        ember: {
          300: '#E8A87C',
          400: '#D4855A',
          500: '#B8622E',
          600: '#9A4E1E',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: 0.4 },
          '50%':       { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
