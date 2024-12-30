import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          light: {
            gray: "#F0F2F5",
          },
          dark: {
            blue: "#010135",
          },
        },
        accent: {
          100: "#FFF6F0",
          900: "#FF8C48",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
