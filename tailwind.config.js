module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Escanea todos los archivos en la carpeta src
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          light: '#F3C1C0',
          lighter: '#f4c4c2',
          medium: '#d19ba1',
          dark: '#d87ea6',
          darker: '#a06078',
        },
      },
    },
  },
  plugins: [],
};