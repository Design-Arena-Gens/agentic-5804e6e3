import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.svg"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#128C7E",
          dark: "#075E54",
          accent: "#25D366"
        },
        chat: {
          background: "#0B141A",
          surface: "#111B21",
          panel: "#1F2C33",
          bubble: {
            incoming: "#202C33",
            outgoing: "#005C4B"
          }
        }
      },
      boxShadow: {
        panel: "0 12px 30px rgba(0, 0, 0, 0.45)"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
