/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        "3xl": " 0px 5px 15px rgba(0, 0, 0, 0.35)",
      },
      mixBlendMode: {
        multiply: "multiply", // Object of blend modes
        screen: "screen",
      },
    },
  },
  plugins: [],
};
