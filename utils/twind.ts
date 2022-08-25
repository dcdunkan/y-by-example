import { IS_BROWSER } from "$fresh/runtime.ts";
import { apply, Configuration, setup } from "twind";

export * from "twind";

export const config: Configuration = {
  darkMode: "media",
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
  plugins: {
    link: apply`text-grammy-500 hover:underline`,
    awht: { fill: "#eeeeee"},
    wht: { fill: "#ffffff", "stop-color": "#ffffff" },
  },
};

if (IS_BROWSER) setup(config);
