import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      container : {
        center : true,
        padding : {
          DEFAULT : "1rem",
          sm: "3rem",
          xl: "5rem",
        }
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

