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
} = require("./secrets.nogit.json")

// These are kept separately to keep development configs out of git
const { developmentRaw } = require("./env.dev.nogit.js")

const removeNullValues = (obj) => {
  Object.keys(obj).forEach(
    (key) => (obj[key] === null || obj[key] === undefined) && delete obj[key]
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
  REACT_APP_BRAND_NAME: "MailMyBallot.org",
  REACT_APP_URL: "https://mailmyballot.org/",
  REACT_APP_ELECTION_AND_DATE:
    "the General Election on Tuesday, November 3rd, 2020",
  REACT_APP_FEEDBACK_ADDR: "geuntabuwono@ymail.com",
  REACT_APP_ELECTION_OFFICIAL_ADDR: "geuntabuwono@ymail.com",
  REACT_APP_SUPPORT_ADDR: "geuntabuwono@ymail.com",
  MG_FROM_ADDR:
    "Vote by Mail Application <application@sandbox6283d0f220014dd9b06a276af5ccfb70.mailgun.org>",
  MG_REPLY_TO_ADDR:
    "Vote by Mail Application <application@sandbox6283d0f220014dd9b06a276af5ccfb70.mailgun.org>",
  ELECTIONS_OFFICIALS_VERSION: "v1.4.0",
})

const development = removeNullValues({
  ...base,
  NODE_ENV: "development",
  MG_DOMAIN: DEV.MG_DOMAIN,
  REACT_APP_ENVIRONMENT: "development",
  GCLOUD_PROJECT: "mmb-dev-cee81",
  GOOGLE_APPLICATION_CREDENTIALS: "./secrets/my-ballot-staging.json",
  REACT_APP_GOOGLE_UA: "UA-164550246-2",
  REACT_APP_URL: "http://localhost:3000/",
  FIRESTORE_URL: DEV.FIRESTORE_URL,
  REACT_APP_SERVER: "http://localhost:8080",
  GOOGLE_CLIENT_ID: DEV.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: DEV.GOOGLE_CLIENT_SECRET,
  SESSION_SECRET: DEV.SESSION_SECRET,
  GOOGLE_MAPS_API_KEY: DEV.GOOGLE_MAPS_API_KEY,
  REACT_APP_SHOW_DEV_INFO: 1,
  GOOGLE_CLIENT_CALLBACK: "http://localhost:8080/auth/google/callback",
  GOOGLE_STORAGE_BUCKET: DEV.GOOGLE_STORAGE_BUCKET,
  DEV_SERVER_PORT: 8080,
  REACT_APP_DEFAULT_ADDRESS: 1,
  REACT_APP_TIMEOUT: 2000,
  DEV_EMAIL: "email@example.com",
  NUNJUNKS_DISABLE_CACHE: 1,
  TWILIO_DIVERT: 1,
  REACT_APP_MOCK: 1,
  ...developmentRaw,
})

const staging = removeNullValues({
  ...base,
  NODE_ENV: "production",
  MG_DOMAIN: STAGING.MG_DOMAIN,
  REACT_APP_ENVIRONMENT: "staging",
  GCLOUD_PROJECT: "mmb-staging",
  GOOGLE_APPLICATION_CREDENTIALS: "./secrets/my-ballot-staging.json",
  REACT_APP_GOOGLE_UA: "UA-164550246-1",
  REACT_APP_BRAND_NAME: "Staging.MailMyBallot.org",
  REACT_APP_URL: "https://staging.mailmyballot.org/",
  FIRESTORE_URL: STAGING.FIRESTORE_URL,
  DEV_SERVER_PORT: 8080,
  REACT_APP_SERVER: "http://localhost:8080",
  GOOGLE_CLIENT_ID: STAGING.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: STAGING.GOOGLE_CLIENT_SECRET,
  SESSION_SECRET: STAGING.SESSION_SECRET,
  GOOGLE_MAPS_API_KEY: STAGING.GOOGLE_MAPS_API_KEY,
  GOOGLE_CLIENT_CALLBACK:
    "https://app-staging.mailmyballot.org/auth/google/callback",
  GOOGLE_STORAGE_BUCKET: STAGING.GOOGLE_STORAGE_BUCKET,
  REACT_APP_TIMEOUT: 10000,
  TWILIO_DIVERT: 1,
})

const production = removeNullValues({
  ...staging,
  NODE_ENV: "production",
  MG_DOMAIN: PROD.MG_DOMAIN,
  DEV_SERVER_PORT: 8080,
  REACT_APP_ENVIRONMENT: "production",
  GCLOUD_PROJECT: "mmb-prod",
  GOOGLE_APPLICATION_CREDENTIALS: "./secrets/my-ballot-staging.json",
  REACT_APP_GOOGLE_UA: "UA-164550246-3",
  REACT_APP_BRAND_NAME: "MailMyBallot.org",
  REACT_APP_URL: "https://mailmyballot.org/",
  FIRESTORE_URL: PROD.FIRESTORE_URL,
  REACT_APP_SERVER: "http://localhost:8080",
  GOOGLE_CLIENT_ID: PROD.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: PROD.GOOGLE_CLIENT_SECRET,
  SESSION_SECRET: PROD.SESSION_SECRET,
  GOOGLE_MAPS_API_KEY: PROD.GOOGLE_MAPS_API_KEY,
  GOOGLE_CLIENT_CALLBACK: "https://app.mailmyballot.org/auth/google/callback",
  GOOGLE_STORAGE_BUCKET: PROD.GOOGLE_STORAGE_BUCKET,
  REACT_APP_EMAIL_FAX_OFFICIALS: 1,
})

const test = removeNullValues({
  ...base,
  FIRESTORE_URL: "http://localhost:8081", // for e2e tests with firestore emulator
  NODE_ENV: "test",
  REACT_APP_SERVER: "https://example.com",
  REACT_APP_TIMEOUT: 2000,
  FIRESTORE_EMULATOR_HOST: "localhost:8081",
  GOOGLE_MAPS_API_KEY: DEV.GOOGLE_MAPS_API_KEY,
  MG_DISABLE: 1,
  TWILIO_DISABLE: 1,
})

const ci = removeNullValues({
  ...test,
  CI: "true",
})

module.exports = {
  development,
  staging,
  production,
  test,
  ci,
}
