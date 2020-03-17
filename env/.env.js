// https://www.npmjs.com/package/env-cmd
const { MG_API_KEY, DEV_EMAIL } = require('./secrets/secrets.json')

const base = {
  SERVER_PORT: 8080,
  FIRESTORE_URL: 'https://invitee-reminder-testdev.firebaseio.com',
  GOOGLE_APPLICATION_CREDENTIALS: '../../env/secrets/vbm-test-dev-firebase-adminsdk-vckij-c18602702a.json',
  MG_API_KEY,
  MG_DOMAIN: 'email.vbmreg.org',
  MG_FROM_ADDR: 'Vote by Mail Registration <registration@email.vbmreg.org>',
}

const development = {
  ...base,
  NODE_ENV: 'development',
  REACT_APP_SERVER: 'http://localhost:8080',
  REACT_APP_SHOW_WARNING: 1,
  REACT_APP_SHOW_DEV_INFO: 1,
  REACT_APP_DEFAULT_ADDRESS: 1,
  REACT_APP_TIMEOUT: 2000,
  DEBUG_LETTER: 1,
  DEV_EMAIL,
}

const staging = {
  ...base,
  NODE_ENV: 'staging',
  REACT_APP_SERVER: 'https://vbm-test-dev.appspot.com/',
  REACT_APP_SHOW_WARNING: 1,
  REACT_APP_TIMEOUT: 10000,
  REACT_APP_DEBUG: 1,
  DEBUG_LETTER: 1,
}

const test = {
  ...base,
  NODE_ENV: 'test',
  REACT_APP_SERVER: 'https://exaample.com',
  REACT_APP_TIMEOUT: 2000,
  MG_DISABLE: 1,
}

const ci = {
  ...test,
  CI: 'true',
}

module.exports = {
  development,
  staging,
  test,
  ci,
}
