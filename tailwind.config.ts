import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF6EC',
        cream: '#F3ECDB',
        ink: '#17211C',
        pine: {
          light: '#17714F',
          DEFAULT: '#0C5B40',
          dark: '#073C2A',
          deep: '#052A1E',
        },
        marigold: {
          light: '#F6C453',
          DEFAULT: '#E9A319',
          dark: '#C07F0A',
        },
        clay: '#C4502B',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['"Public Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Soft, premium elevation (replaces the old hard offset shadows)
        card: '0 1px 2px rgba(23,33,28,0.05), 0 12px 32px -16px rgba(7,60,42,0.25)',
        lift: '0 24px 48px -20px rgba(7,60,42,0.38)',
        soft: '0 1px 3px rgba(23,33,28,0.07)',
      },
    },
  },
  plugins: [],
};

export default config;
