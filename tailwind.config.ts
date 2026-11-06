import type { Config } from 'tailwindcss';

// Theme: clean modern academic — bright white surfaces, deep navy primary,
// saffron/amber accent. (Legacy token names paper/cream/ink/clay are kept so
// older markup keeps working, with values updated to the new palette.)
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        cream: '#EEF3FA',
        surface: '#F4F7FB',
        ink: '#17233B',
        navy: {
          light: '#2E5A94',
          DEFAULT: '#143A66',
          dark: '#0E2C50',
          deep: '#081F3C',
          50: '#EEF3FA',
          100: '#D9E4F2',
          200: '#B3C9E4',
          600: '#1D4E89',
          700: '#173F70',
          800: '#12325A',
          900: '#0D2748',
          950: '#081C36',
        },
        saffron: {
          light: '#FFBE3C',
          DEFAULT: '#F59E0B',
          dark: '#B45309',
        },
        clay: '#DC2626',
      },
      fontFamily: {
        display: ['Archivo', '"Public Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', '"Public Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(13,39,72,0.05), 0 10px 30px -14px rgba(13,39,72,0.18)',
        lift: '0 22px 44px -18px rgba(13,39,72,0.30)',
        soft: '0 1px 3px rgba(13,39,72,0.07)',
      },
    },
  },
  plugins: [],
};

export default config;
