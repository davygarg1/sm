/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      minWidth: {
        '360': '360px',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

