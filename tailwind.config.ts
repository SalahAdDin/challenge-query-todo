import type { Config } from "tailwindcss";

import forms from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        lime: {
          "50": "#e7ffe4",
          "100": "#c9ffc4",
          "200": "#98ff90",
          "300": "#56ff50",
          "400": "#00ff00",
          "500": "#00e606",
          "600": "#00b809",
          "700": "#008b07",
          "800": "#076d0d",
          "900": "#0b5c11",
          "950": "#003406",
        },
        red: {
          "50": "#fff0f0",
          "100": "#ffdddd",
          "200": "#ffc0c0",
          "300": "#ff9494",
          "400": "#ff5757",
          "500": "#ff2323",
          "600": "#ff0000",
          "700": "#d70000",
          "800": "#b10303",
          "900": "#920a0a",
          "950": "#500000",
        },
        silver: {
          "50": "#f7f7f7",
          "100": "#ededed",
          "200": "#dfdfdf",
          "300": "#c4c4c4",
          "400": "#adadad",
          "500": "#999999",
          "600": "#888888",
          "700": "#7b7b7b",
          "800": "#676767",
          "900": "#545454",
          "950": "#363636",
        },

        customBackground: {
          dark: "rgba(56, 62, 84, 1)",
          redLight: "rgba(255, 0, 0, 0.2)",
          grayLight: "rgba(196, 196, 196, 0.2)",
          greenLight: "rgba(0, 255, 0, 0.2)",
        },
      },
    },
  },
  plugins: [forms],
} satisfies Config;
