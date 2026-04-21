/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        cormorant: ["Cormorant Garamond", "serif"],
      },
      colors: {
        "navy":       "#1A5276",
        "navy-mid":   "#2980B9",
        "sky":        "#85C1E9",
        "gold":       "#D4AF37",
        "gold-light": "#F0D060",
        "cream":      "#FAF8F5",
        "charcoal":   "#1C1C1E",
        "stone":      "#6B6B6B",
        "off-white":  "#f8f8f8",
        "black-100":  "#2B2C35",
        "primary-blue": {
          DEFAULT: "#2B59FF",
          100: "#F5F8FF",
        },
        grey: "#747A88",
      },
      backgroundImage: {
        'pattern':  "url('/pattern.png')",
        'hero-bg':  "url('/hero-bg.png')",
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease forwards',
        'fade-in':    'fadeIn 1s ease forwards',
        'slide-left': 'slideLeft 0.7s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%':   { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};