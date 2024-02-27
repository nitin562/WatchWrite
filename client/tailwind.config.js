/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        LoginBG: "url('./loginBgPng.png')",
        CoverImage: "url('./default-cover.jpeg')"
      },
      fontFamily: {
        AR_One_Sans: ["AR One Sans"],
        Abel: ["Abel"],
        Amaranth: ["Amaranth"],
        Anton: ["Anton"],
        Arsenal: ["Arsenal"],
        Barlow: ["Barlow"],
        Bruno_Ace_SC: ["Bruno Ace SC"],
        Comfortaa: ["Comfortaa"],
        Comforter: ["Comforter"],
        Dosis: ["Dosis"],
        Ephesis: ["Ephesis"],
        Jost: ["Jost"],
        Maven_Pro: ["Maven Pro"],
        Oxygen: ["Oxygen"],
        PT_Sans_Narrow: ["PT Sans Narrow"],
        Palanquin: ["Palanquin"],
        Philosopher: ["Philosopher"],
        Quicksand: ["Quicksand"],
      },
    },
  },
  plugins: [],
};
