/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '100': '28rem',
        '90': '22rem',
      },
      keyframes: {
        slideRight: {
          '0%,100%': { transform: "translateX(10px)" },
          "50%": {transform: "translateX(0)"}
        },
        drawCircleSpinnerIn: {
          "0%": {  "stroke-dashoffset": 180 },
          "100%": {  "stroke-dashoffset": 0 }
        },
        drawCircleSpinnerOut: {
          "0%": {  "stroke-dashoffset": 0 },
          "100%": {  "stroke-dashoffset": 180 }
        },
        slideIn: {
          from: {
            transform: 'translateY(100%)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          "0%": {  "opacity": 0 },
          "100%": {  "opacity": 180 }
        },
        growUpFade: {
          from: {
            transform: 'scale(10%)',
            opacity:0.1
          },
          to: {
            transform: 'scale(100%)',
            opacity:1
          },
        },
        slideLeftTop: {
          from: {
            transform: 'translateX(100%) translateY(100%)',
          },
          to: {
            transform: 'translateX(0) translateY(0)',
          },
        },
        slideRightTop: {
          from: {
            transform: 'translateX(-100%) translateY(100%)',
          },
          to: {
            transform: 'translateX(0) translateY(0)',
          },
        },
      },
      animation: {
        'slideRight': 'slideRight 1.5s ease-in-out infinite',
        "drawCircleSpinnerIn":"drawCircleSpinnerIn 1s",
        "drawCircleSpinnerOut":"drawCircleSpinnerOut 1s",
        "slideIn":"slideIn 1.5s ease-in-out",
        "fadeIn":"fadeIn 0.5s ease-in-out",
        "growUpFade":"growUpFade 1s ",
        "slideLeftTop":"slideLeftTop 1s ease-in-out",
        "slideRightTop":"slideRightTop 1s ease-in-out"
      }
    },
  },
  plugins: [require("daisyui")],

}

