import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0f172a',
        'background-dark': '#24305e',
        'secondary-dark': '#374785',
        'background-light': '#a8d0e6',
        warning: '#f76c6c',
        hover: '#f8e9a1',
        'primary-light': '#d9d9d9',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
    },
  },
  plugins: [typography],
};

export default config;
