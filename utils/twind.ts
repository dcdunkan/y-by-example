import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";

export * from "twind";

export const config: Configuration = {
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
};

if (IS_BROWSER) setup(config);
