module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      serif: ['Comorant', 'serif'],
      sans: ['Lato', 'sans-serif'],
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        'dark-blue': '#074275',
        // 'md-blue': '#1F3B5C',
        'md-blue': '#042447', // take this one out and make it nav-blue
        'navbar-blue': '#042447',
        'light-blue-notif': '#eefafe',
        'off-black': '#333333',
        // 'btn-primary-blue': '#095495',
        // 'btn-primary-blue': '#315885',
        'btn-primary-blue': '#053060',
        // 'heading-blue': '#1f67a6',
        // 'heading-blue': '#3D699A',
        // 'heading-blue': '#255B94',
        'heading-blue': '#274e79',
        'light-grey': '#f7f7f7',
        'blue-accent': '#0d7ee0',
        'light-blue-accent': '#89b8e0',
        'darkest-blue': '#08213E',
        'footer-blue': '#02162B',
        'accent-gold': '#B57300',
      },
      keyframes: {
        growDown: {
          '0%': {
            transform: 'scaleY(0)',
          },
          '100%': {
            transform: 'scaleY(1)',
          },
        },
        growRight: {
          '0%': {
            transform: 'scaleX(0)',
          },
          '100%': {
            transform: 'scaleX(1)',
          },
        },
        fadeBar2: {
          from: {
            transform: 'scaleX(1)',
            opacity: 1,
          },
          to: {
            transform: 'scaleX(0)',
            opacity: 0,
          },
        },
        rotateBar1: {
          from: {
            transform: 'rotate(0)',
          },
          to: {
            transform: 'rotate(45deg) translate(3px, 13px)',
          },
        },
        rotateBar3: {
          from: {
            transform: 'rotate(0)',
          },
          to: {
            transform: 'rotate(-45deg) translate(3px, -13px)',
          },
        },
        rotateChevron: {
          from: {
            transform: 'rotate(0)',
          },
          to: {
            transform: 'rotate(540deg)',
          },
        },
      },
      animation: {
        growDown: 'growDown 250ms ease-in-out forwards',
        growRight: 'growRight 250ms ease-in-out forwards',
        fadeBar2: 'fadeBar2 250ms ease-in forwards',
        rotateBar1: 'rotateBar1 250ms ease-in forwards',
        rotateBar3: 'rotateBar3 250ms ease-in forwards',
        rotateChevron: 'rotateChevron 250ms ease-in forwards',
      },
      screens: {
        tablet: '800px',
      },
    },
  },
  plugins: [],
}
