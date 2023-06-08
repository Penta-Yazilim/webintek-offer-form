const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const { parseColor } = require("tailwindcss/lib/util/color");

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
    },
  });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-[var(--circle-bg-color)]",
    "w-[60px]",
    "h-[60px]",
    "swiper-slide-prev-prev",
    "swiper-slide-next-next",
  ],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1440px" },
      lg: { max: "1280px" },
      md: { max: "1024px" },
      sm: { max: "768px" },
      xs: { max: "480px" },
      "2xs": { max: "425px" },
    },
    fontFamily: {
      primary: ["Plus Jakarta Sans", "sans-serif"],
    },
    extend: {
      opacity:{
        75: "0.75",
      },
      transitionDuration: {
        350: "350ms",
        450: "450ms",
        600: "600ms",
        750: "750ms",
      },
      aspectRatio: {
        auto: "auto",
        square: "1 / 1",
        video: "16 / 9",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
      },
      colors: {
        primary: "#8c9fe1",
        transparent: "transparent",
        current: "currentColor",
        white: "#FFFFFF",
        black: "#000000",
        "body-color": "#1c212c",
        "text-color": "#FFFFFF",
        mirage: {
          50: "#f5f7fa",
          100: "#ebeef3",
          200: "#d2d9e5",
          300: "#aab8cf",
          400: "#7c92b4",
          500: "#5b759c",
          600: "#475c82",
          700: "#3b4b69",
          800: "#334159",
          900: "#181d27",
        },
        "dull-lavender": {
          50: "#f1f5fc",
          100: "#e5edfa",
          200: "#d0ddf5",
          300: "#b4c5ed",
          400: "#8c9fe1",
          500: "#7b89d9",
          600: "#6169ca",
          700: "#5157b1",
          800: "#444a8f",
          900: "#3c4173",
        },
        "ebony-clay-3": {
          50: "#f6f7f9",
          100: "#ebedf3",
          200: "#d4d9e3",
          300: "#aeb9cb",
          400: "#8293ae",
          500: "#627595",
          600: "#4d5d7c",
          700: "#3f4b65",
          800: "#374055",
          900: "#292f3c",
        },
        "ebony-clay-2": {
          50: "#f6f7f9",
          100: "#ebeef3",
          200: "#d3d9e4",
          300: "#acb8cd",
          400: "#7f93b1",
          500: "#5f7598",
          600: "#4b5e7e",
          700: "#3d4b67",
          800: "#364156",
          900: "#222834",
        },
        "ebony-clay": {
          50: "#f5f6fa",
          100: "#ebedf3",
          200: "#d2d8e5",
          300: "#abb8ce",
          400: "#7d91b3",
          500: "#5d739a",
          600: "#495b80",
          700: "#3c4a68",
          800: "#354057",
          900: "#1c212c",
        },
        "shuttle-gray": {
          50: "#f6f7f9",
          100: "#edeef1",
          200: "#d7dae0",
          300: "#b3bac6",
          400: "#8a94a6",
          500: "#6c778b",
          600: "#5f697e",
          700: "#474e5d",
          800: "#3d434f",
          900: "#363a44",
        },
        "chetwode-blue": {
          50: "#f1f5fc",
          100: "#e5eefa",
          200: "#cfdff6",
          300: "#b2c9ef",
          400: "#93ace6",
          500: "#7289da",
          600: "#5e6ecd",
          700: "#4e5ab4",
          800: "#414c92",
          900: "#3a4375",
        },
        lynch: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d4d9e3",
          300: "#afb8ca",
          400: "#8493ac",
          500: "#6d7e9b",
          600: "#505e79",
          700: "#414c63",
          800: "#394253",
          900: "#333a47",
        },
      },
      container: {
        center: true,
        padding: "30px",
      },
    },
  },
  /* corePlugins: {
        aspectRatio: false,
    }, */
  plugins: [
    require("@tailwindcss/typography")({ className: "editor" }),
    // require('@tailwindcss/forms'),
    /* require('@tailwindcss/aspect-ratio'), */
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/container-queries"),
    backfaceVisibility,
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = "") {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          let value = colorObj[colorKey];
          typeof value === "string" &&
          value != null &&
          parseColor(value) != null
            ? (value =
                "rgba(" +
                parseColor(value).color.join(", ") +
                ")") /* value = parseColor(value).color.join('') */
            : "";

          const cssVariable =
            colorKey === "DEFAULT"
              ? `--color${colorGroup}`
              : `--color${colorGroup}-${colorKey}`;

          const newVars =
            typeof value === "string" && value != null
              ? { [cssVariable]: value }
              : typeof value === "object" && value != null
              ? extractColorVars(value, `-${colorKey}`)
              : {};

          return { 
            ...vars, 
            ...newVars,
            '--color-back-button': '#222834'
          };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
  ],
};
