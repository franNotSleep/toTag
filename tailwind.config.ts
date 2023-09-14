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
    colors: {
      primary: "#C0F8D1",
      secondary: "#05F140",
    },
  },
  daisyui: {
    themes: ["retro"],
  },
  plugins: [daisyui, typography, tailwindScrollbar],
};
export default config;
