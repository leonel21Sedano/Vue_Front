module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // Asegúrate que este puerto coincida con el de tu backend
        changeOrigin: true
      }
    }
  }
};