// Based on https://www.npmjs.com/package/env-cmd
const {
  MG_API_KEY,
  TWILIO_SID,
  TWILIO_TOKEN,
  TWILIO_FAX_NUMBER,
  RECEIVE_FAX_NUMBER,
  STAGING,
  DEV,
  PROD,
} = require('./secrets.nogit.json')

// These are kept separately to keep development configs out of git
const { developmentRaw } = require('./env.dev.nogit.js')

const removeNullValues = (obj) => {
  Object.keys(obj).forEach(
    key => (obj[key] === null || obj[key] === undefined) && delete obj[key]
  )
  return obj
}

const base = removeNullValues({
  MG_API_KEY,
  TWILIO_SID,
  TWILIO_TOKEN,
  TWILIO_FAX_NUMBER,
  RECEIVE_FAX_NUMBER,
  USER_MAX_ORGS: 8,
  REACT_APP_BRAND_NAME: 'MailMyBallot.org',
  REACT_APP_URL: 'https://mailmyballot.org/',
  REACT_APP_ELECTION_AND_DATE: 'the General Election on Tuesday, November 3rd, 2020',
  REACT_APP_FEEDBACK_ADDR: 'feedback@mailmyballot.org',
  REACT_APP_ELECTION_OFFICIAL_ADDR: 'elections@mailmyballot.org',
  REACT_APP_SUPPORT_ADDR: 'support@mailmyballot.org',
  MG_DOMAIN: 'email.mailmyballot.org',
  MG_FROM_ADDR: 'Vote by Mail Application <application@email.mailmyballot.org>',
  MG_REPLY_TO_ADDR: 'Vote by Mail Application <application@mailmyballot.org>',
  ELECTIONS_OFFICIALS_VERSION: 'v1.3.6',
})

const development = removeNullValues({
  ...base,
  NODE_ENV: 'development',
  REACT_APP_ENVIRONMENT: 'development',
  GCLOUD_PROJECT: 'mmb-dev-cee81',
  GOOGLE_APPLICATION_CREDENTIALS: './secrets/mmb-dev-cee81-firebase-adminsdk-qlb2m-0f68a6fdc7.json',
  REACT_APP_GOOGLE_UA: 'UA-164550246-2',
  REACT_APP_URL: 'http://localhost:3000/',
  FIRESTORE_URL: 'https://mmb-dev-cee81.firebaseio.com',
  REACT_APP_SERVER: 'http://localhost:8080',
  GOOGLE_CLIENT_ID: DEV.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: DEV.GOOGLE_CLIENT_SECRET,
  SESSION_SECRET: DEV.SESSION_SECRET,
  GOOGLE_MAPS_API_KEY: DEV.GOOGLE_MAPS_API_KEY,
  REACT_APP_SHOW_DEV_INFO: 1,
  GOOGLE_CLIENT_CALLBACK: 'http://localhost:8080/auth/google/callback',
  GOOGLE_STORAGE_BUCKET: 'mmb-dev-cee81.appspot.com',
  DEV_SERVER_PORT: 8080,
  REACT_APP_DEFAULT_ADDRESS: 1,
  REACT_APP_TIMEOUT: 2000,
  DEV_EMAIL: 'email@example.com',
  NUNJUNKS_DISABLE_CACHE: 1,
  TWILIO_DIVERT: 1,
  ...developmentRaw,
})

const staging = removeNullValues({
  ...base,
  NODE_ENV: 'production',
  REACT_APP_ENVIRONMENT: 'staging',
  GCLOUD_PROJECT: 'mmb-staging',
  GOOGLE_APPLICATION_CREDENTIALS: './secrets/mmb-staging-firebase-adminsdk-jsepr-073f157679.json',
  REACT_APP_GOOGLE_UA: 'UA-164550246-1',
  REACT_APP_BRAND_NAME: 'Staging.MailMyBallot.org',
  REACT_APP_URL: 'https://staging.mailmyballot.org/',
  FIRESTORE_URL: 'https://mmb-staging.firebaseio.com',
  REACT_APP_SERVER: 'https://app-staging.mailmyballot.org/',
  GOOGLE_CLIENT_ID: STAGING.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: STAGING.GOOGLE_CLIENT_SECRET,
  SESSION_SECRET: STAGING.SESSION_SECRET,
  GOOGLE_MAPS_API_KEY: STAGING.GOOGLE_MAPS_API_KEY,
  GOOGLE_CLIENT_CALLBACK: 'https://app-staging.mailmyballot.org/auth/google/callback',
  GOOGLE_STORAGE_BUCKET: 'mmb-staging.appspot.com',
  REACT_APP_TIMEOUT: 10000,
  TWILIO_DIVERT: 1,
})

const production = removeNullValues({
  ...staging,
  NODE_ENV: 'production',
  REACT_APP_ENVIRONMENT: 'production',
  GCLOUD_PROJECT: 'mmb-prod',
  GOOGLE_APPLICATION_CREDENTIALS: './secrets/mmb-prod-firebase-adminsdk-ygilq-417666ddc7.json',
  REACT_APP_GOOGLE_UA: 'UA-164550246-3',
  REACT_APP_BRAND_NAME: 'MailMyBallot.org',
  REACT_APP_URL: 'https://mailmyballot.org/',
  FIRESTORE_URL: 'https://mmb-prod.firebaseio.com',
  REACT_APP_SERVER: 'https://app.mailmyballot.org/',
  GOOGLE_CLIENT_ID: PROD.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: PROD.GOOGLE_CLIENT_SECRET,
  SESSION_SECRET: PROD.SESSION_SECRET,
  GOOGLE_MAPS_API_KEY: PROD.GOOGLE_MAPS_API_KEY,
  GOOGLE_CLIENT_CALLBACK: 'https://app.mailmyballot.org/auth/google/callback',
  GOOGLE_STORAGE_BUCKET: 'mmb-prod.appspot.com',
  REACT_APP_EMAIL_FAX_OFFICIALS: 1,
})

const test = removeNullValues({
  ...base,
  FIRESTORE_URL: 'http://localhost:8081',  // for e2e tests with firestore emulator
  NODE_ENV: 'test',
  REACT_APP_SERVER: 'https://example.com',
  REACT_APP_TIMEOUT: 2000,
  FIRESTORE_EMULATOR_HOST: 'localhost:8081',
  GOOGLE_MAPS_API_KEY: DEV.GOOGLE_MAPS_API_KEY,
  MG_DISABLE: 1,
  TWILIO_DISABLE: 1,
})

const ci = removeNullValues({
  ...test,
  CI: 'true',
})

module.exports = {
  development,
  staging,
  production,
  test,
  ci,
}
