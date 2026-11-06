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
        card: '0 2px 0 0 rgba(23,33,28,0.9)',
        lift: '0 18px 40px -18px rgba(7,60,42,0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
