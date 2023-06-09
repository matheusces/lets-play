/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'background': '#100014',
        'overlay': 'rgba(0, 0, 0, 0.5)',
        'primary': '#C600B2',
        'secondary': '#00DEEC',
        'tertiary': '#CEEF00',
        'bdr-purple': '#EE00BA',
        'blue-primary': 'rgba(4, 0, 49, 0.7)',
        'green-primary': 'rgba(0, 34, 42, 0.7)',
        'highlight': 'rgba(194, 3, 175, 0.46)',
        'panel': 'rgba(20, 0, 36, 0.8)',
        'input-panel': 'rgba(20, 0, 36, 1)',
        'panel-item': '#1B2565',
        'form': 'rgba(27, 37, 101, 0.90)',
        'participants': 'rgba(194, 3, 175, 0.4)',
        'input': '#500751',
        'img': 'rgba(0, 3, 30, 0.5)',
        'color-0': '#D9D9D9',
        'color-1': '#F3A5EC',
        'color-2': '#FF70EA',
        'color-3': '#FF32D2',
        'color-4': '#FF00B7',
      },
      fontFamily: {
        'primary': ['Aldrich', 'sans-serif'],
      },
      dropShadow: {
        'logo': '0 1.5px 2.5px #A936B1',
        'img': '0 2px 20px #EE00BA',
        'primary': '0 1.5px 6px #EE00BA',
        'secondary': '0 1.5px 5px #00FFFF',
        'tertiary': '0 1.5px 5px #CEEF00',
      },
      listStyleImage: {
        arrow: "url('./assets/right-arrow-purple.svg')"
      },
      backgroundImage: {
        galaxy: "url('./src/assets/stars.svg')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 27.08%, #43E7AD 33.94%, #E1D55D 40.57%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      }
    },
  },
  plugins: [],
}

