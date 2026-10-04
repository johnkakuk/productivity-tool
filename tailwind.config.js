/** @type {import('tailwindcss').Config} */
module.exports = {
  // Paths to every file that uses className (this project keeps code under src/)
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Dark & moody surfaces, darkest (950) to lightest (100)
        ink: {
          950: '#0b0b0f',
          900: '#131319',
          800: '#1c1c24',
          700: '#2a2a34',
          500: '#6b6b7a',
          300: '#a1a1b0',
          100: '#ececf1',
        },
        accent: '#a3e635', // lime-400
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          500: '#6b7280',
          900: '#111827',
        },
      },
      fontFamily: {
        'system': ['System'],
      },
    },
  },
  plugins: [],
}
