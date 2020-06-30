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
} = process.env.CI ? require('./secrets.sample.json') : require('./secrets.nogit.json')

// These are kept separately to keep development configs out of git
const { developmentRaw } = process.env.CI ? require('./env.dev.sample.js') : require('./env.dev.nogit.js')

const removeNullValues = (obj) => {
  Object.keys(obj).forEach(
    key => (obj[key] === null || obj[key] === undefined) && delete obj[key]
  )
  return obj
}

const useVoteByMailNames = false

const names = useVoteByMailNames ? require('./env.voteByMail.js') : require('./env.mailMyBallot.js')

const base = removeNullValues({
  MG_API_KEY,
  TWILIO_SID,
  TWILIO_TOKEN,
  TWILIO_FAX_NUMBER,
  RECEIVE_FAX_NUMBER,
  USER_MAX_ORGS: 8,
  REACT_APP_BRAND_NAME: names.base.REACT_APP_BRAND_NAME,
  REACT_APP_URL: names.base.REACT_APP_URL,
  REACT_APP_ELECTION_AND_DATE: 'the General Election on Tuesday, November 3rd, 2020',
  REACT_APP_FEEDBACK_ADDR: names.base.REACT_APP_FEEDBACK_ADDR,
  REACT_APP_ELECTION_OFFICIAL_ADDR: names.base.REACT_APP_ELECTION_OFFICIAL_ADDR,
  REACT_APP_SUPPORT_ADDR: names.base.REACT_APP_SUPPORT_ADDR,
  MG_DOMAIN: names.base.MG_DOMAIN,
  MG_FROM_ADDR: names.base.MG_FROM_ADDR,
  MG_REPLY_TO_ADDR: names.base.MG_REPLY_TO_ADDR,
  ELECTIONS_OFFICIALS_VERSION: 'v1.7.1',
})

const development = removeNullValues({
  ...base,
  NODE_ENV: 'development',
  REACT_APP_ENVIRONMENT: 'development',
  GCLOUD_PROJECT: names.development.GCLOUD_PROJECT,
  GOOGLE_APPLICATION_CREDENTIALS: names.development.GOOGLE_APPLICATION_CREDENTIALS,
  REACT_APP_GOOGLE_UA: 'UA-164550246-2',
  REACT_APP_URL: 'http://localhost:3000/',
  FIRESTORE_URL: names.development.FIRESTORE_URL,
  REACT_APP_SERVER: 'http://localhost:8080',
  GOOGLE_CLIENT_ID: DEV.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: DEV.GOOGLE_CLIENT_SECRET,
  SESSION_SECRET: DEV.SESSION_SECRET,
  GOOGLE_MAPS_API_KEY: DEV.GOOGLE_MAPS_API_KEY,
  REACT_APP_SHOW_DEV_INFO: 1,
  GOOGLE_CLIENT_CALLBACK: 'http://localhost:8080/auth/google/callback',
  GOOGLE_STORAGE_BUCKET: names.development.GOOGLE_STORAGE_BUCKET,
  DEV_SERVER_PORT: 8080,
  REACT_APP_DEFAULT_ADDRESS: 1,
  REACT_APP_TIMEOUT: 2000,
  DEV_EMAIL: 'email@example.com',
  NUNJUNKS_DISABLE_CACHE: 1,
  TWILIO_DIVERT: 1,
  REACT_APP_MOCK: 1,
  ...developmentRaw,
})

const staging = removeNullValues({
  ...base,
  NODE_ENV: 'production',
  REACT_APP_ENVIRONMENT: 'staging',
  GCLOUD_PROJECT: names.staging.GCLOUD_PROJECT,
  GOOGLE_APPLICATION_CREDENTIALS: names.staging.GOOGLE_APPLICATION_CREDENTIALS,
  REACT_APP_GOOGLE_UA: 'UA-164550246-1',
  REACT_APP_BRAND_NAME: names.staging.REACT_APP_BRAND_NAME,
  REACT_APP_URL: names.staging.REACT_APP_URL,
  FIRESTORE_URL: names.staging.FIRESTORE_URL,
  REACT_APP_SERVER: names.staging.REACT_APP_SERVER,
  GOOGLE_CLIENT_ID: STAGING.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: STAGING.GOOGLE_CLIENT_SECRET,
  SESSION_SECRET: STAGING.SESSION_SECRET,
  GOOGLE_MAPS_API_KEY: STAGING.GOOGLE_MAPS_API_KEY,
  GOOGLE_CLIENT_CALLBACK: names.staging.GOOGLE_CLIENT_CALLBACK,
  GOOGLE_STORAGE_BUCKET: names.staging.GOOGLE_STORAGE_BUCKET,
  REACT_APP_TIMEOUT: 10000,
  TWILIO_DIVERT: 1,
})

const michael = {
  ...staging,
  REACT_APP_URL: 'https://michael.mailmyballot.org/',
}

const production = removeNullValues({
  ...staging,
  NODE_ENV: 'production',
  REACT_APP_ENVIRONMENT: 'production',
  GCLOUD_PROJECT: names.production.GCLOUD_PROJECT,
  GOOGLE_APPLICATION_CREDENTIALS: names.production.GOOGLE_APPLICATION_CREDENTIALS,
  REACT_APP_GOOGLE_UA: 'UA-164550246-3',
  REACT_APP_BRAND_NAME: names.production.REACT_APP_BRAND_NAME,
  REACT_APP_URL: names.production.REACT_APP_URL,
  FIRESTORE_URL: names.production.FIRESTORE_URL,
  REACT_APP_SERVER: names.production.REACT_APP_SERVER,
  GOOGLE_CLIENT_ID: PROD.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: PROD.GOOGLE_CLIENT_SECRET,
  SESSION_SECRET: PROD.SESSION_SECRET,
  GOOGLE_MAPS_API_KEY: PROD.GOOGLE_MAPS_API_KEY,
  GOOGLE_CLIENT_CALLBACK: names.production.GOOGLE_CLIENT_CALLBACK,
  GOOGLE_STORAGE_BUCKET: names.production.GOOGLE_STORAGE_BUCKET,
  EMAIL_FAX_OFFICIALS: 1,
  TWILIO_DIVERT: undefined,
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
  michael,
  test,
  ci,
}
