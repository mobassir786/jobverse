/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2A6F97",
          dark: "#1B1F3B",
        },
      },
    },
  },
  plugins: [],
};
