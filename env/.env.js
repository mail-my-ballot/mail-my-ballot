// Based on https://www.npmjs.com/package/env-cmd
const {
  MG_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  STAGING,
  DEV,
  SESSION_SECRET,
} = require('./secrets/secrets.json')

// These are kept separately to keep development configs out of git
const { developmentRaw } = require('./.env.dev.js')

const base = {
  SERVER_PORT: 8080,
  USER_MAX_ORGS: 8,
  BRAND_NAME: 'mailmyballot.org/',
  FRONT_END: 'https://mailmyballot.org/',
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SESSION_SECRET,
  MG_API_KEY,
  MG_DOMAIN: 'email.mailmyballot.org',
  MG_FROM_ADDR: 'Vote by Mail Registration <registration@email.mailmyballot.org>',
}

const development = {
  ...base,
  GOOGLE_APPLICATION_CREDENTIALS: './secrets/mmb-dev-cee81-firebase-adminsdk-qlb2m-0f68a6fdc7.json',
  NODE_ENV: 'development',
  FRONT_END: 'http://localhost:3000/',
  FIRESTORE_URL: 'https://mmb-dev-cee81.firebaseio.com',
  REACT_APP_SERVER: 'http://localhost:8080',
  GOOGLE_CLIENT_ID: DEV.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: DEV.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_CALLBACK: 'http://localhost:8080/auth/google/callback',
  REACT_APP_SHOW_DEV_INFO: 1,
  REACT_APP_DEFAULT_ADDRESS: 1,
  REACT_APP_TIMEOUT: 2000,
  DEBUG_LETTER: 1,
  DEV_EMAIL: 'email@example.com',
  ...developmentRaw,
}

const staging = {
  ...base,
  GOOGLE_APPLICATION_CREDENTIALS: './secrets/mmb-staging-firebase-adminsdk-jsepr-073f157679.json',
  NODE_ENV: 'staging',
  BRAND_NAME: 'staging.mailmyballot.org',
  FRONT_END: 'https://staging.mailmyballot.org/',
  FIRESTORE_URL: 'https://mmb-staging.firebaseio.com',
  REACT_APP_SERVER: 'https://app-staging.mailmyballot.org/',
  GOOGLE_CLIENT_ID: STAGING.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: STAGING.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_CALLBACK: 'https://app-staging.mailmyballot.org/auth/google/callback',
  REACT_APP_TIMEOUT: 10000,
  REACT_APP_DEBUG: 1,
  DEBUG_LETTER: 1,
}

const production = {
  ...staging,
  REACT_APP_EMAIL_OFFICIALS: 1,
}

const test = {
  ...base,
  NODE_ENV: 'test',
  REACT_APP_SERVER: 'https://example.com',
  REACT_APP_TIMEOUT: 2000,
  FIRESTORE_EMULATOR_HOST: 'localhost:8081',
  MG_DISABLE: 1,
}

const ci = {
  ...test,
  CI: 'true',
}

module.exports = {
  development,
  staging,
  production,
  test,
  ci,
}
