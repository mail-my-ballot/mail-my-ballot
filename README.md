# vbm

## Getting Started

### Manual Dependencies
Almost all dependnecies are listed in devDependencies.  However, still depends on
- Install yarn (< 1) globally (`npm i -g yarn`)
- Install now globally (`npm i -g now`).
- To deploy the server using Google Cloud, follow the steps in `https://cloud.google.com/appengine/docs/standard/nodejs/quickstart`.

### Installation
In the root directory, run `yarn install`.

### Starting the dev server
To start the client and backend dev servers, run
```bash
yarn server gulp start // server on localhost:8080
yarn client gulp start // client on localhost:3000
```

These commands will likely fail until you have setup the configuration correctly (see below).

### Configuration
Running the app requires some configuration setting.  All of those are exported in `env/env.js`.  It has two dependencies that are not checked into source control:

#### Dev Overrides
`env.dev.nogit.js`: will generally work out of the box.  To run the backend services, you will want to override the existing configuration.
#### Application Secrets
`secrets.nogit.json`: The secrets can be made empty strings (they must be defined for the server to work).  You can set them as you need to

## Configuration Details
Below are the settings that need to be set to get an environment to work:

#### Mailgun
You only need these to send emails (last step in signup flow).  It's easy to get set up for free.

#### Twilio
You only need these to send faxes (last step in signup flow).  It's easy to get set up for free.

#### Incoming fax numbers
To test Twilio, we setup an incoming fax number.  ([FaxBurner](https://www.faxburner.com/)) offers a free temporary one.  Set `RECEIVE_FAX_NUMBER` to this number.

#### Dev Firestore Access
Goto the [Firebase Console](https://console.firebase.google.com/u/0/project/mmb-dev-cee81/settings/serviceaccounts/adminsdk) and generate a new key and place it in `packages/server/secrets/[...].json`.
Then make sure `env.js` has `GOOGLE_APPLICATION_CREDENTIALS` set to `./secrets/[...].json` (override using `developmentRaw`).

#### Google OAuth (development of organizer-facing pages only)
Following the instructions [here](http://www.passportjs.org/docs/google/):

1. Enable [Google+ API from the Console](https://console.developers.google.com/apis/api/plus.googleapis.com/overview?project=mmb-staging)
2. Once you have done the above, you should be able to turn on the [OAuth Conset screen](https://console.developers.google.com/apis/credentials/consent?project=mmb-staging)
3. Once you have done the above, you should be able to create [OAuth Credentials](https://console.developers.google.com/apis/credentials?project=mmb-staging)

Download and save these credentials for dev, prod, and staging.  Thes eare the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` fields.

#### Google Maps API
You will have to enable Google Maps geolocation and set `GOOGLE_MAPS_API_KEY` in order to do the ZIP code to state and address to election official lookups.  Instructions [here](https://developers.google.com/maps/documentation/geocoding/get-api-key).

#### Express session secrets
Set `SESSION_SECRET` to a random string of your choice to encrypt sessions.

## Repo Structure
The code is a lerna repo split into three packages:
- `packages/client`
- `packages/server`
- `packages/common` shared code symlinked between above to

Each package has it's own `gulpfile.js`

### Runnign tasks
To invoke the grunt file, run commands like
```bash
yarn server gulp script --env developement --file src/script/fetchData.ts
```

### Checking repo
To check if the repo is working run the following four commands
```bash
yarn bootstrap && yarn build && yarn lint && yarn test
```

## Adding a State
To add a new state, you will need to complete the following steps:
1. Increment version number and publish a new version of the [elections official data](https://github.com/mail-my-ballot/elections-officials).
1. Match the version number in the environment variable `ELECTIONS_OFFICIALS_VERSION`
1. Add the state to `availableStates` and `implementedStates` const arrays in `common`.  This should start generating type errors from incomplete switch statements when you run
    ```
    yarn build
    ```
    Fixing those errors by pattern matching should get you a new state.  Becareful to follow the state-by-state regulations for VBM signup.  For reference, here are the core commits adding [Arizona](https://github.com/mail-my-ballot/mail-my-ballot/commit/arizona) and [New York](https://github.com/mail-my-ballot/mail-my-ballot/commit/new_york).

## App Engine (Server Deploy)
To get started, goto [AppEngine Getting Started](https://console.cloud.google.com/appengine/start?project=mmb-staging&folder&organizationId) and follow the prompts.

Don't forget to enable the indexes (see the gulp file server's `gulpfile.js`).  The recommended procedure is to
1. Claim an org on dev and clik the download button.  This will fail but the server log on dev will give you a link where you can create the index.  Alternatively, the current index is saved in `firestore.index.json`.
2. Run `yarn server-gulp dev-index` to update `firestore.index.json` (optional -- only if there are additional index needs).
3. Run the command resulting from `yarn server-gulp deploy-index --env staging` to upload the index to staging (and also production).

### Secrets in Server Production
Configuration and secrets are currently added into `app.yaml` (not in git) from `app.tmpl.yaml` via gulp process (stored in git).

Alternative (not used): follow this [SO answer](https://stackoverflow.com/a/54055525/8930600), put all secrets in a special file that is not stored in source control.

## Web Data
### Development
- [Log Viewer](https://console.cloud.google.com/logs/viewer?project=mmb-dev-cee81)
- [Console](https://console.cloud.google.com/home/dashboard?project=mmb-dev-cee81)
- [Firestore Data Viewer](https://console.cloud.google.com/firestore/data?project=mmb-dev-cee81)
- [Storage Viewer](https://console.cloud.google.com/storage/browser?project=mmb-dev-cee81)
- [Firestore Permission Rules](https://console.firebase.google.com/u/0/project/mmb-dev-cee81/database/firestore/rules)

### Staging
- [Log Viewer](https://console.cloud.google.com/logs/viewer?project=mmb-staging)
- [Console](https://console.cloud.google.com/home/dashboard?project=mmb-staging)
- [Firestore Data Viewer](https://console.cloud.google.com/firestore/data?project=mmb-staging)
- [Storage Viewer](https://console.cloud.google.com/storage/browser?project=mmb-staging)
- [Firestore Permission Rules](https://console.firebase.google.com/u/0/project/mmb-staging/database/firestore/rules)

### Production
- [Log Viewer](https://console.cloud.google.com/logs/viewer?project=mmb-prod)
- [Console](https://console.cloud.google.com/home/dashboard?project=mmb-prod)
- [Firestore Data Viewer](https://console.cloud.google.com/firestore/data?project=mmb-prod)
- [Storage Viewer](https://console.cloud.google.com/storage/browser?project=mmb-prod)
- [Firestore Permission Rules](https://console.firebase.google.com/u/0/project/mmb-prod/database/firestore/rules)

## Resources
### Asthetics
- [MUI CSS Colors](https://www.muicss.com/docs/v1/getting-started/colors)
- [Gradient Codegen](https://cssgradient.io/)

### Markdown Library
We're using [Marked](https://www.npmjs.com/package/marked), which has more dependents, downloads, and is smaller than [Showdown](https://www.npmjs.com/package/showdown).  The documentation on how to run it in node is available [here](https://marked.js.org/#/USING_ADVANCED.md#options)

## Elections Resources
### From Vote at Home Insitute
- [Vote by Mail in the Primary](https://www.voteathome.org/wp-content/uploads/2019/08/2020-Presidential-Primary-Guide-to-Mail-Ballot-Voting.pdf)
- [Vote by Mail in the General Election](https://www.voteathome.org/wp-content/uploads/2019/07/NVAHI-Guide-to-When_How-to-Apply-2020.pdf)
- [Ballot Ready COVID-19](https://docs.google.com/spreadsheets/d/1nCgI28asUZi4FVihJd4YbjfdSUC4K3SMEECsMpyaQQE/edit?ts=5e8fa7d8#gid=1917493118)

## About Us
This repository is for [MailMyBallot.org](https://mailmyballot.org), a [National Vote at Home Institute](https://voteathome.org) project.

## Contributors
- [tianhuil](https://github.com/tianhuil/)
