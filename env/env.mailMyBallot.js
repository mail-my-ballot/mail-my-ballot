const base = {
  REACT_APP_BRAND_NAME: 'MailMyBallot.org',
  REACT_APP_URL: 'https://mailmyballot.org/',
  REACT_APP_FEEDBACK_ADDR: 'feedback@mailmyballot.org',
  REACT_APP_ELECTION_OFFICIAL_ADDR: 'elections@mailmyballot.org',
  REACT_APP_SUPPORT_ADDR: 'support@mailmyballot.org',
  MG_DOMAIN: 'email.mailmyballot.org',
  MG_FROM_ADDR: 'Vote by Mail Application <application@email.mailmyballot.org>',
  MG_REPLY_TO_ADDR: 'Vote by Mail Application <application@mailmyballot.org>',
}

const development = {
  GCLOUD_PROJECT: 'mmb-dev-cee81',
  GOOGLE_APPLICATION_CREDENTIALS: './secrets/mmb-dev-cee81-firebase-adminsdk-qlb2m-0f68a6fdc7.json',
  FIRESTORE_URL: 'https://mmb-dev-cee81.firebaseio.com',
  GOOGLE_STORAGE_BUCKET: 'mmb-dev-cee81.appspot.com',
}

const staging = {
  GCLOUD_PROJECT: 'mmb-staging',
  GOOGLE_APPLICATION_CREDENTIALS: './secrets/mmb-staging-firebase-adminsdk-jsepr-073f157679.json',
  REACT_APP_BRAND_NAME: 'Staging.MailMyBallot.org',
  REACT_APP_URL: 'https://staging.mailmyballot.org/',
  FIRESTORE_URL: 'https://mmb-staging.firebaseio.com',
  REACT_APP_SERVER: 'https://app-staging.mailmyballot.org/',
  GOOGLE_CLIENT_CALLBACK: 'https://app-staging.mailmyballot.org/auth/google/callback',
  GOOGLE_STORAGE_BUCKET: 'mmb-staging.appspot.com',
}

const production = {
  GCLOUD_PROJECT: 'mmb-prod',
  GOOGLE_APPLICATION_CREDENTIALS: './secrets/mmb-prod-firebase-adminsdk-ygilq-417666ddc7.json',
  REACT_APP_BRAND_NAME: 'MailMyBallot.org',
  REACT_APP_URL: 'https://mailmyballot.org/',
  FIRESTORE_URL: 'https://mmb-prod.firebaseio.com',
  REACT_APP_SERVER: 'https://app.mailmyballot.org/',
  GOOGLE_CLIENT_CALLBACK: 'https://app.mailmyballot.org/auth/google/callback',
  GOOGLE_STORAGE_BUCKET: 'mmb-prod.appspot.com',
}

module.exports = {
  base,
  development,
  staging,
  production,
}