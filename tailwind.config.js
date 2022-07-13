/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // dark_mode_bg: "url('https://images.pling.com/img/00/00/61/57/57/1549487/577c4dc30402a8dfa3915867a59e64a89b7b723b9ac219fd677bdd0415563d4f084f.jpg')",
        dark_mode_bg: "url('https://t4.ftcdn.net/jpg/02/43/70/93/360_F_243709369_EwiVZPwWqSc3wOG6K8VyyqNmIAbCyAl2.jpg')",
        light_mode_bg: "url('https://img.freepik.com/free-vector/abstract-background-pastel-neon-colors_108964-240.jpg')"
      }
    },
  },
  plugins: [],
}
