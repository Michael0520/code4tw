module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      content: [
        './src/**/*.{tsx,ts,jsx,js}',
        '../../packages/ui/src/**/*.{tsx,ts}',
      ]
    }
  }
};
