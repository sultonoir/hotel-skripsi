/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "#0f172a",
        background: "#fff",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mythemes: {
          secondary: "#f1f5f9",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
