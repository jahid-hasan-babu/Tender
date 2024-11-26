import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          "orange-50": "#fff8e8",
          "orange-100": "#fee9b8",
          "orange-200": "#fede96",
          "orange-300": "#fecf66",
          "orange-400": "#fdc548",
          "orange-500": "#fdb71a",
          "orange-600": "#e6a718",
          "orange-700": "#b48212",
          "orange-800": "#8b650e",
          "orange-900": "#6a4d0b",
        },
        white: {
          "white-50": "#ffffff",
          "white-100": "#ffffff",
          "white-200": "#ffffff",
          "white-300": "#ffffff",
          "white-400": "#ffffff",
          "white-500": "#ffffff",
          "white-600": "#e8e8e8",
          "white-700": "#b5b5b5",
          "white-800": "#8c8c8c",
          "white-900": "#6b6b6b",
        },
        black: {
          "black-50": "#e6e6e6",
          "black-100": "#b0b0b0",
          "black-200": "#8a8a8a",
          "black-300": "#545454",
          "black-400": "#333333",
          "black-500": "#000000",
          "black-600": "#000000",
          "black-700": "#000000",
          "black-800": "#000000",
          "black-900": "#000000",
        },
        grey: {
          "grey-50": "#f1f1f1",
          "grey-100": "#d5d5d5",
          "grey-200": "#c0c0c0",
          "grey-300": "#a4a4a4",
          "grey-400": "#929292",
          "grey-500": "#777777",
          "grey-600": "#6c6c6c",
          "grey-700": "#545454",
          "grey-800": "#414141",
          "grey-900": "#323232",
        },
      },
    },
    fontFamily: {
      INTER: ["Inter", "sans-serif"]
    },

  },
 
} satisfies Config;
