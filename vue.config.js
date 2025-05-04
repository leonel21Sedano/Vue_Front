module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // URL de tu backend
        changeOrigin: true
      }
    }
  }
};