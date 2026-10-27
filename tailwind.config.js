/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        luxury: {
          dark: '#090407',
          surface: '#140810',
          card: '#1C0B17',
          border: 'rgba(244, 63, 94, 0.22)',
          gold: {
            light: '#FFE4E8',
            DEFAULT: '#FB7185',
            dark: '#E11D48',
          },
          rose: {
            light: '#FFF1F2',
            DEFAULT: '#F43F5E',
            deep: '#9F1239',
          },
          ivory: '#FFF5F7',
          muted: '#B897A4',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        script: ['"Cormorant Garamond"', 'cursive', 'serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 50px -10px rgba(244, 63, 94, 0.35)',
        'glow-rose': '0 0 50px -10px rgba(225, 29, 72, 0.4)',
        'luxury': '0 20px 50px -12px rgba(0, 0, 0, 0.8)',
        'inner-gold': 'inset 0 1px 1px 0 rgba(244, 63, 94, 0.25)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'fade-in': 'fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
