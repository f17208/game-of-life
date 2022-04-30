module.exports = {
  important: true,
  purge: {
    content: ['./src/**/*.tsx']
  },
  theme: {
    extend: {
      colors: {
        primary: '#00b0fe',
        secondary: '#fe6744',
      },
    }
  },
  variants: {
    
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
  },
};