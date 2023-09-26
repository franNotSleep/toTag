import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";
import tailwindScrollbar from "tailwind-scrollbar";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["forest"],
  },
  plugins: [daisyui, typography, tailwindScrollbar],
};
export default config;
