import { IS_BROWSER } from "$fresh/runtime.ts";
import { apply, Configuration, setup } from "twind";

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
  preflight: {
    code: apply`font-mono bg-gray-100 inline box-border p-1 rounded-sm`,
  },
};

if (IS_BROWSER) setup(config);
