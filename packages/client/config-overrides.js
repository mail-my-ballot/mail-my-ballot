module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config;
  config.resolve.symlinks = false
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
  return config
}
