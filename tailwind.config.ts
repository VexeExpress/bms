import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rounded: "Rounded, Helvetica, Arial, sans-serif",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'right-only': '4px 0 8px rgba(0, 0, 0, 0.1)', // Đổ bóng nhẹ bên phải
      },
    },
  },
  plugins: [],
};
export default config;
