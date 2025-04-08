/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

    theme: {
      extend: {
        fontFamily: {
          Inter: ['Inter', 'sans-serif'], 
          roboto: ['Roboto', 'sans-serif'],
          
          sans: ['Poppins', 'sans-serif'],
        },
        colors: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          light: "var(--color-light)",
          semilight: "var(--color-semilight)",
          mid: "var(--color-mid)",
          accent: "var(--color-accent)",
        },
      },
    },
    plugins: [],
  };
  