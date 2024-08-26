/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["Comfortaa", "sans-serif"],
      },
      colors: {
        light: {
          backgroundColor: "#F5F1F1",
          green: "#6ADF6E",
        },
        dark: {
          backgroundColor: "#090A09",
          green: "#7EFF83",
        },
      },
    },
  },
  plugins: [],
};
