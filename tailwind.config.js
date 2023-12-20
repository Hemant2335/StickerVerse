/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend:
    {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      boxShadow :{
        '3xl' : ' 0px 5px 15px rgba(0, 0, 0, 0.35)'
      },
      mixBlendMode: {
        'multiply': 'multiply', // Object of blend modes
        'screen': 'screen',
      },
    },
  },
  plugins: [],
}
