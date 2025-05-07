module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
        headers: {
          Connection: 'keep-alive'
        }
      }
    },
    // Configuración adicional para permitir CORS en desarrollo
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }
  },
  configureWebpack: {
    node: {
      // Solo propiedades válidas para la configuración de node
      __dirname: true,
      __filename: true,
      global: true
    },
    // Resolver los problemas con util._extend de manera correcta
    resolve: {
      fallback: {
        util: false // Desactivar el polyfill de util
      }
    }
  },
  chainWebpack: config => {
    // Suprimir advertencias de deprecación
    config.optimization.minimizer('terser').tap(args => {
      if (args && args[0] && args[0].terserOptions) {
        args[0].terserOptions.warnings = false;
      }
      return args;
    });
    
    // Resolver los problemas con util._extend
    config.resolve.alias
      .set('util', false);
      
    // Establecer externals para evitar el problema de util._extend
    config.externals({
      'util._extend': 'Object.assign'
    });
  }
};