import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  darkMode: "class",
  mode: "silent",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Epilogue", "sans-serif"],
      },
      colors: {
        grammy: {
          400: "#38BDF8",
          500: "#0EA5E9",
        },
      },
    },
  },
} as Options;
