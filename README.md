# vbm

## Getting Started

### Manual Dependencies
Almost all dependnecies are listed in devDependencies.  However, still depends on
- Install now globally (`npm i -g now`).
- To deploy the server using Google Cloud, follow the steps in `https://cloud.google.com/appengine/docs/standard/nodejs/quickstart`.

### App Engine
To get started, goto [AppEngine Getting Started](https://console.cloud.google.com/appengine/start?project=mmb-staging&folder&organizationId) and follow the prompts.

Don't forget to enable the indexes (see the gulp file server's `gulpfile.js`).  The recommended procedure is to
1. Claim an org on dev and clik the download button.  This will fail but the server log on dev will give you a link where you can create the index.  Alternatively, the current index is saved in `firestore.index.json`.
2. Run `yarn server-gulp dev-index` to update `firestore.index.json` (optional -- only if there are additional index needs).
3. Run the command resulting from `yarn server-gulp deploy-index --env staging` to upload the index to staging (and also production).

### Google OAuth
Following the instructions [here](http://www.passportjs.org/docs/google/):

1. Enable [Google+ API from the Console](https://console.developers.google.com/apis/api/plus.googleapis.com/overview?project=mmb-staging)
2. Once you have done the above, you should be able to turn on the [OAuth Conset screen](https://console.developers.google.com/apis/credentials/consent?project=mmb-staging)
3. Once you have done the above, you should be able to create [OAuth Credentials](https://console.developers.google.com/apis/credentials?project=mmb-staging)

Download and save these credentials for dev, prod, and staging.

## Secrets
### Secrets in Dev
Put all secrets in `env/secrets.json`, which is not checked into source control.

#### Dev Firestore Access
Goto the [Firebase Console](https://console.firebase.google.com/u/0/project/mmb-dev-cee81/settings/serviceaccounts/adminsdk) and generate a new key and place it in `packages/server/secrets/[...].json`.
Then make sure `env.js` has `GOOGLE_APPLICATION_CREDENTIALS` set to `./secrets/[...].json`.

### Secrets in Production
Configuration and secrets are currently added into `app.yaml` (not in git) from `app.tmpl.yaml` via gulp process (stored in git).

Alternative (not used): follow this [SO answer](https://stackoverflow.com/a/54055525/8930600), put all secrets in a special file that is not stored in source control.

## Markdown Library
We're using [Marked](https://www.npmjs.com/package/marked), which has more dependents, downloads, and is smaller than [Showdown](https://www.npmjs.com/package/showdown).  The documentation on how to run it in node is available [here](https://marked.js.org/#/USING_ADVANCED.md#options)

## Development
- [Log Viewer](https://console.cloud.google.com/logs/viewer?project=mmb-dev-cee81)
- [Console](https://console.cloud.google.com/home/dashboard?project=mmb-dev-cee81)
- [Firestore Data Viewer](https://console.cloud.google.com/firestore/data?project=mmb-dev-cee81)
- [Firestore Permission Rules](https://console.firebase.google.com/u/0/project/mmb-dev-cee81/database/firestore/rules)

## Staging
- [Log Viewer](https://console.cloud.google.com/logs/viewer?project=mmb-staging)
- [Console](https://console.cloud.google.com/home/dashboard?project=mmb-staging)
- [Firestore Data Viewer](https://console.cloud.google.com/firestore/data?project=mmb-staging)
- [Firestore Permission Rules](https://console.firebase.google.com/u/0/project/mmb-staging/database/firestore/rules)

## Production
- [Log Viewer](https://console.cloud.google.com/logs/viewer?project=mmb-prod)
- [Console](https://console.cloud.google.com/home/dashboard?project=mmb-prod)
- [Firestore Data Viewer](https://console.cloud.google.com/firestore/data?project=mmb-prod)
- [Firestore Permission Rules](https://console.firebase.google.com/u/0/project/mmb-prod/database/firestore/rules)

## Asthetics
- [MUI CSS Colors](https://www.muicss.com/docs/v1/getting-started/colors)
- [Gradient Codegen](https://cssgradient.io/)

# Elections Resources
## From Vote at Home Insitute
- [Vote by Mail in the Primary](https://www.voteathome.org/wp-content/uploads/2019/08/2020-Presidential-Primary-Guide-to-Mail-Ballot-Voting.pdf)
- [Vote by Mail in the General Election](https://www.voteathome.org/wp-content/uploads/2019/07/NVAHI-Guide-to-When_How-to-Apply-2020.pdf)
- [Ballot Ready COVID-19](https://docs.google.com/spreadsheets/d/1nCgI28asUZi4FVihJd4YbjfdSUC4K3SMEECsMpyaQQE/edit?ts=5e8fa7d8#gid=1917493118)
