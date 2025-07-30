module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'plankton': '#00f5d4',
        'deep-blue': '#0a192f',
        'teal': {
          400: '#00f5d4',
          500: '#00e5c4',
          600: '#00d5b4',
          700: '#00c5a4',
          800: '#00b594',
          900: '#00a584',
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}