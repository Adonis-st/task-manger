/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coal: "#000112",
        very_dark_gray: "#20212C",
        dark_gray: "#2B2C37",
        lines: "#3E3F4E",
        medium_gray: "#828FA3",
        light_gray: "#F4F7FD",
        purple: "#635FC7",
        purple_hover: "#A8A4FF",
        danger: "#EA5555",
        danger_hover: "#FF9898",
      },
    },
  },
  plugins: [],
};
