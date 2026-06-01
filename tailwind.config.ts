import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0E2A47',
        secondary: '#D0A12B',
        ink: '#0E2A47',
        graphite: '#303844',
        sand: '#D0A12B',
        mist: '#f7f4ee',
        porcelain: '#fbfaf7',
        navy: '#0E2A47',
      },
      fontFamily: {
        serif: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 24px 80px rgba(24, 33, 43, 0.10)',
        soft: '0 18px 50px rgba(24, 33, 43, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
