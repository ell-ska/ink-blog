/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      dark: {
        900: '#24272C',
        500: '#A7AAAF'
      },
      light: '#FFF',
      accent: '#FEC8E8'
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        marker: ['var(--font-permanent-marker)']
      },
      borderWidth: {
        '1': '1px'
      }
    }
  },
  plugins: [],
}
