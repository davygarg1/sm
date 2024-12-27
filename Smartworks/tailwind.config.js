/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"),
  ],
}

