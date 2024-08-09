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
