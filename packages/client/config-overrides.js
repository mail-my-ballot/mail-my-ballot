module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.symlinks = false
  config.resolve.alias = {
    "react": "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
    "react-dom": "preact/compat"
  }
  return config
}
