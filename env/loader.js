const dotenvFlow = require('dotenv-flow')
dotenvFlow.config({
  path: '../../env',  // relative to package.json
  purge_dotenv: true,
})
