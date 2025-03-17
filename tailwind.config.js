/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      boxShadow: {
        'custom-ios': '0px 2px 3px rgba(0, 0, 0, 0.1)', // Bóng giống React Native
      },
    },
  },
  plugins: [],
}