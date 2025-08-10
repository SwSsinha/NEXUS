/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(20px, -30px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.7', filter: 'drop-shadow(0 0 0 rgba(113, 100, 192, 0.0))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 24px rgba(113, 100, 192, 0.45))' },
        },
        dash: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 12s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        marquee: 'marquee 20s linear infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        dash: 'dash 4s ease-in-out forwards',
        'spin-slow': 'spin 28s linear infinite',
        'spin-slower': 'spin 45s linear infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
      },
      colors: {
        gray: {
          50: "rgba(255, 255, 255, 0.5)",
          100: "#eeeeef",
          200: "#e6e9ed",
          600: "#95989c"
        },
        purple: {
          200: "#d9ddee",
          500: "#9492db",
          600: "#7164c0",
        }
      }
    },
  },
  plugins: [],
}

