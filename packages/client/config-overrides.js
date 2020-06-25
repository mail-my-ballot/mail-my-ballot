module.exports = function override(config, env) {
  require('react-app-rewire-postcss')(config, {
    plugins: loader => [
      require('autoprefixer')()
   ]
 })
  config;
  config.resolve.symlinks = false
  return config
}
