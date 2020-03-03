const dotenvFlow = require('dotenv-flow')
dotenvFlow.config({
  node_env: 'development',
  path: '../../env',  // relative to package.json
  purge_dotenv: true,
})
