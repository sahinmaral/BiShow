/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cornflower-blue": {
          50: "#eef6ff",
          100: "#dfeeff",
          200: "#c6deff",
          300: "#a3c8fe",
          400: "#7fa6fa",
          500: "#7091f5",
          600: "#435fe8",
          700: "#354dcd",
          800: "#2e42a5",
          900: "#2c3d83",
          950: "#1a224c",
        },
        "purple-heart": {
          50: "#f6f4fe",
          100: "#eeeafd",
          200: "#dfd9fb",
          300: "#c7baf8",
          400: "#aa93f2",
          500: "#8e67eb",
          600: "#793fdf",
          700: "#6f35cc",
          800: "#5c2cab",
          900: "#4d268c",
          950: "#30165f",
        },
        anakiwa: {
          50: "#effefc",
          100: "#c7fff9",
          200: "#97fff4",
          300: "#50f8ec",
          400: "#1de4dc",
          500: "#04c8c3",
          600: "#00a1a1",
          700: "#057f80",
          800: "#0a6365",
          900: "#0d5354",
          950: "#003033",
        },
        dolly: {
          50: "#fefee8",
          100: "#ffffc2",
          200: "#fffd8c",
          300: "#fff445",
          400: "#fce513",
          500: "#eccc06",
          600: "#cca002",
          700: "#a27206",
          800: "#86590d",
          900: "#724911",
          950: "#432605",
        },
      },
      fontFamily: {
        spaceGrotesk: "Space Grotesk",
      },
    },
  },
  plugins: [],
};
