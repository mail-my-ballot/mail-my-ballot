const dotenvFlow = require('dotenv-flow')
dotenvFlow.config({
  node_env: 'development',
  path: '../../env',
  purge_dotenv: true,
})
