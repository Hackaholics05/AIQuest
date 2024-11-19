// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include your project files
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Add Flowbite React paths
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // Add the Flowbite plugin
  ],
};
