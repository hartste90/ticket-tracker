import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        onyx: {
          DEFAULT: "#393e41",
          100: "#0b0c0d",
          200: "#17191a",
          300: "#222527",
          400: "#2e3234",
          500: "#393e41",
          600: "#5d666b",
          700: "#838d93",
          800: "#acb3b7",
          900: "#d6d9db",
        },
        timberwolf: {
          DEFAULT: "#d3d0cb",
          100: "#2d2a26",
          200: "#59544c",
          300: "#867f72",
          400: "#aca79e",
          500: "#d3d0cb",
          600: "#dbd9d5",
          700: "#e4e3e0",
          800: "#edecea",
          900: "#f6f6f5",
        },
        old_gold: {
          DEFAULT: "#e2c044",
          100: "#332a08",
          200: "#665410",
          300: "#9a7d18",
          400: "#cda720",
          500: "#e2c044",
          600: "#e8cd6b",
          700: "#eed990",
          800: "#f3e6b5",
          900: "#f9f2da",
        },
        myrtle_green: {
          DEFAULT: "#587b7f",
          100: "#121919",
          200: "#233133",
          300: "#354a4c",
          400: "#466265",
          500: "#587b7f",
          600: "#739a9e",
          700: "#96b3b6",
          800: "#b9ccce",
          900: "#dce6e7",
        },
        eerie_black: {
          DEFAULT: "#1e2019",
          100: "#060605",
          200: "#0c0d0a",
          300: "#12130f",
          400: "#181914",
          500: "#1e2019",
          600: "#4d5241",
          700: "#7d8569",
          800: "#a9af99",
          900: "#d4d7cc",
        },
        rose_taupe: {
          DEFAULT: "#805858",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
