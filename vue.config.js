module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // Asegúrate que este puerto coincida con el de tu backend
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    node: {
      // Elimina la propiedad 'util' que no es válida
      __dirname: true,
      __filename: true,
      global: true
    }
  }
};