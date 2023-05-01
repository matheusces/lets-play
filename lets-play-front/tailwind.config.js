/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'background': '#100014',
        'primary': '#C600B2',
        'bdr-purple': '#EE00BA',
        'blue-primary': 'rgba(4, 0, 49, 0.7)',
        'green-primary': 'rgba(0, 34, 42, 0.7)'
      },
      fontFamily: {
        'primary': ['Aldrich', 'sans-serif'],
      },
      dropShadow: {
        'primary': '0 1.2px 1.2px #EE00BA'
      },
    },
  },
  plugins: [],
}

