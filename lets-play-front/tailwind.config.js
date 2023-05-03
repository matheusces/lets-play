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
        'green-primary': 'rgba(0, 34, 42, 0.7)',
        'highlight': 'rgba(194, 3, 175, 0.46)'
      },
      fontFamily: {
        'primary': ['Aldrich', 'sans-serif'],
      },
      dropShadow: {
        'logo': '0 1.5px 2.5px #A936B1',
        'img': '0 2px 20px #EE00BA',
        'primary': '0 1.5px 6px #EE00BA',
        'secondary': '0 1.5px 5px #00FFFF',
      },
      listStyleImage: {
        arrow: "url('./assets/right-arrow-purple.svg')"
      }
    },
  },
  plugins: [],
}

