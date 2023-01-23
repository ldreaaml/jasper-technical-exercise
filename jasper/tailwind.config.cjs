/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        blue: "#0f46de",
        darkBlue: "#14246c",
        error: "#ff1344",
        lightPink: "#fff7f5",
      },
    },
  },
  plugins: [],
};
