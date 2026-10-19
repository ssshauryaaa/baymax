/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cond: ['"Barlow Condensed"', 'Oswald', 'sans-serif'],
        oswald: ['Oswald', '"Barlow Condensed"', 'sans-serif'],
        sans: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['Oswald', '"Barlow Condensed"', 'sans-serif'],
      },
      colors: {
        'red-hero': {
          DEFAULT: '#d62027',
          bright: '#df2229',
          dark: '#b8151b',
          glow: 'rgba(214, 32, 39, 0.45)',
        },
        slate: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        'purple-armor': {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
          dark: '#5b21b6',
        },
        portal: {
          red: '#d62027',
          teal: '#2dd4bf',
          purple: '#8b5cf6',
          amber: '#fbbf24',
          lilac: '#c084fc',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 5s ease-in-out infinite',
        glow: 'glow 2.5s ease-in-out infinite',
        marquee: 'ticker 35s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
