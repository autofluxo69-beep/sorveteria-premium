/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0F0F1E',
        'dark-gradient': '#2D1B4E',
        'beige': '#E8D4B8',
        'beige-light': '#F5E6D3',
        'accent-orange': '#FB923C',
        'text-gray': '#A8A8A8',
        'success-green': '#10b981',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Poppins"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0F0F1E 0%, #2D1B4E 100%)',
        'hero-gradient-radial': 'radial-gradient(circle at 80% 20%, rgba(251,146,60,0.12), transparent 55%), linear-gradient(135deg, #0F0F1E 0%, #2D1B4E 100%)',
      },
      boxShadow: {
        soft: '0 20px 60px -15px rgba(0,0,0,0.5)',
        glow: '0 0 40px rgba(251,146,60,0.25)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
