/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter, Regular", "Arial", "sans-serif"],
      "sans-pro": ["Source Sans Pro", "sans-serif"],
    },
    screens: {
      "3xs": { min: "0px", max: "319px" },
      xxs: { min: "320px", max: "374px" },
      xs: { min: "375px", max: "424px" },
      sm: { min: "425px", max: "767px" },
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        "3xs": { min: "0px", max: "319px" },
        xxs: { min: "320px", max: "374px" },
        w2xl: "2048px", // 2048 x 1080 - 2K
        "3xl": "2556px", // 2560 x 1440 - 1440p
        "4xl": "3840px", // 3840 x 2160 - 4K
      },
      text: {
        "3xs": "0.5rem",
      },
      colors: {
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
        blue: {
          500: "#346BD9",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      width: {
        97: "9.50rem", // modified
        100: "18.75rem", // modified
        101: "19rem", // modified
        102: "19.25rem", // modified
        103: "19.50rem", // modified
        104: "19.75rem", // modified
        105: "20rem", // modified
        106: "20.25rem", // modified
        107: "20.50rem", // modified
        108: "20.75rem", // modified
        109: "21rem", // modified
        110: "21.25rem", // modified
        111: "21.50rem", // modified
        112: "21.75rem", // modified
        113: "22rem", // modified
        114: "22.25rem", // modified
        115: "22.50rem", // modified
        116: "22.75rem", // modified
        117: "23rem", // modified
        118: "23.25rem", // modified
        119: "23.50rem", // modified
        120: "23.75rem", // modified
        121: "24rem", // modified
        122: "24.25rem", // modified
        123: "24.50rem", // modified
        124: "24.75rem", // modified
        125: "25rem", // modified
        126: "25.25rem", // modified
        127: "25.50rem", // modified
        128: "25.75rem", // modified
        129: "26rem", // modified
        130: "26.25rem", // modified
        131: "26.50rem", // modified
        132: "26.75rem", // modified
        133: "27rem", // modified
        134: "27.25rem", // modified
        135: "27.50rem", // modified
        136: "27.75rem", // modified
        137: "28rem", // modified
        138: "28.25rem", // modified
        139: "28.50rem", // modified
        140: "28.75rem", // modified
        141: "29rem", // modified
        142: "29.25rem", // modified
        143: "29.50rem", // modified
        144: "29.75rem", // modified
        145: "30rem", // modified
        146: "30.25rem", // modified
        147: "30.50rem", // modified
        148: "30.75rem", // modified
        149: "31rem", // modified
        150: "31.25rem", // modified
      },
      height: {
        100: "18.75rem", // modified
        101: "19rem", // modified
        102: "19.25rem", // modified
        103: "19.50rem", // modified
        104: "19.75rem", // modified
        105: "20rem", // modified
        106: "20.25rem", // modified
        107: "20.50rem", // modified
        108: "20.75rem", // modified
        109: "21rem", // modified
        110: "21.25rem", // modified
        111: "21.50rem", // modified
        112: "21.75rem", // modified
        113: "22rem", // modified
        114: "22.25rem", // modified
        115: "22.50rem", // modified
        116: "22.75rem", // modified
        117: "23rem", // modified
        118: "23.25rem", // modified
        119: "23.50rem", // modified
        120: "23.75rem", // modified
        121: "24rem", // modified
        122: "24.25rem", // modified
        123: "24.50rem", // modified
        124: "24.75rem", // modified
        125: "25rem", // modified
        126: "25.25rem", // modified
        127: "25.50rem", // modified
        128: "25.75rem", // modified
        129: "26rem", // modified
        130: "26.25rem", // modified
        131: "26.50rem", // modified
        132: "26.75rem", // modified
        133: "27rem", // modified
        134: "27.25rem", // modified
        135: "27.50rem", // modified
        136: "27.75rem", // modified
        137: "28rem", // modified
        138: "28.25rem", // modified
        139: "28.50rem", // modified
        140: "28.75rem", // modified
        141: "29rem", // modified
        142: "29.25rem", // modified
        143: "29.50rem", // modified
        144: "29.75rem", // modified
        145: "30rem", // modified
        146: "30.25rem", // modified
        147: "30.50rem", // modified
        148: "30.75rem", // modified
        149: "31rem", // modified
        150: "31.25rem", // modified
      },
      backgroundImage: {
        "service-list": "url('../src/assets/private/service-list.jpg')",
      },
      transitionDuration: {
        1200: "1200ms",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate")],
};
