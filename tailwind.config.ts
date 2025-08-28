import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#1B1B1B",
        blur: "#0C0C0C40",
        current: "currentColor",
        disabled: "#d1d1d1",
        error: "#b42d26",
        greyLight: "#dbdbdb",
        orangeGradient: "#ff5b2a80",
        primary: "#1e1e1e",
        primaryGreen: "#E8FB8E",
        primaryOrange: "#FF864A",
        success: "#00b152",
        successLight: "#65ffac",
        title: "#050504",
        transparent: "transparent",
        white: "#ffffff",
        neutral: {
          100: "#EEEEEE",
          200: "#e7e7e7",
          300: "#d1d1d1",
          400: "#aeaeae",
          500: "#8b8b8b",
          600: "#686868",
          650: "#3e3e3e",
          700: "#454545",
          750: "#292929",
          800: "#1e1e1e",
          900: "#1b1b1b",
          950: "#0c0c0c",
        },
        "p-2": "#8b8b8b",
        "p-1": "#454545",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      letterSpacing: {
        wider: "-0.72px",
        wide: "-1.2px",
        normal: "-1.8px",
        tight: "-4.5px",
        light: "-2.8px",
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
      },
      boxShadow: {
        "3xl": "0 15px 60px 5px rgba(0, 0, 0, 0.05)",
      },
      maxWidth: {
        "mw-container": "1440px",
        wrapper: "1224px",
        358: "358px",
      },
      fontSize: {
        h1: "56px",
        super: "164px",
      },
    },
  },
  plugins: [],
};
export default config;
