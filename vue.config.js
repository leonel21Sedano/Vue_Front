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
      // Esto puede ayudar con problemas de deprecación en dependencias
      __dirname: true,
      __filename: true,
      // Eliminar el uso del módulo util deprecated
      util: false
    }
  },
  chainWebpack: config => {
    // Suprimir advertencias de deprecación
    config.optimization.minimizer('terser').tap(args => {
      args[0].terserOptions.warnings = false;
      return args;
    });
    
    // Resolver los problemas con util._extend
    config.resolve.alias
      .set('util', 'util/util')
      .set('util._extend', false);
      
    // Establecer externals para evitar el problema de util._extend
    config.externals({
      'util._extend': 'Object.assign'
    });
  }
};