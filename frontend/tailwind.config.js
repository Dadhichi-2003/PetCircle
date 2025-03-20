/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./i", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
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
  