import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-15': 'span 15 / span 15',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#116487',
      },
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'], // Add this line
      },
      // fontFamily: {
      //     'roboto-condensed': ['"Roboto Condensed"', 'sans-serif'],
      // },
    },
    // container: {
    //     screens: {
    //         sm: '100%',
    //         md: '100%',
    //         lg: '1024px',
    //         xl: '1280px',
    //     },
    // },
    // screens: {
    //     sm: '640px',
    //     // => @media (min-width: 640px) { ... }

    //     md: '768px',
    //     // => @media (min-width: 768px) { ... }

    //     lg: '1024px',
    //     // => @media (min-width: 1024px) { ... }

    //     xl: '1300px',
    //     // => @media (min-width: 1280px) { ... }

    //     '2xl': '1536px',
    //     // => @media (min-width: 1536px) { ... }
    // },
  },
  plugins: [],
};
export default config;
