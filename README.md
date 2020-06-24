# MailMyBallot.org
![](https://github.com/mail-my-ballot/mail-my-ballot/workflows/Node.js%20CI/badge.svg)

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

### Node version when developing on Linux
On many Linux distros, running the above command may yield compile errors for about `Array.flatMap` and `Object.fromEntries` not being functions.  This issue has been observed [here](https://github.com/mail-my-ballot/mail-my-ballot/issues/11) and [here](https://github.com/mail-my-ballot/mail-my-ballot/pull/19).  The root problem ([documented here](https://github.com/mail-my-ballot/mail-my-ballot/pull/19#issuecomment-643043047)) is that Nodejs v10 (default on Unix) does not support `Object.fromEntries` and `Array.flatMap`.  The solution is to use a more recent version of Node (^v12).  The easiest way for me was to [use nvm](https://github.com/nvm-sh/nvm).  This error does not arise in OSX.

### Configuration
Running the app requires some configuration setting.  All of those are exported in `env/env.js`.  It has two dependencies that are not checked into source control:

- **Dev Overrides**: `env.dev.nogit.js`: will generally work out of the box.  To run the backend services, you will want to override the existing configuration.

- **Application Secrets**: `secrets.nogit.json`: The secrets can be made empty strings (they must be defined for the server to work).  You can set them as you need to

## Configuration Details
Below are the settings that need to be set to get an environment to work.

- **Mailgun**: You only need these to send emails (last step in signup flow).  It's easy to get set up for free.  Since you don't have access to our domain records, you will probabyl want to set your emails to be sent from the sanbox domain that mailgun sets up automatically when you sign up.

- **Twilio**: You only need these to send faxes (last step in signup flow).  It's easy to get set up for free.

- **Incoming fax numbers**: To test Twilio, we setup an incoming fax number.  ([FaxBurner](https://www.faxburner.com/)) offers a free temporary one.  Set `RECEIVE_FAX_NUMBER` to this number.

- **Dev Firestore Access**: Goto the [Firebase Console](https://console.firebase.google.com/u/0/project/mmb-dev-cee81/settings/serviceaccounts/adminsdk) and generate a new key and place it in `packages/server/secrets/[...].json`.
Then make sure `env.js` has `GOOGLE_APPLICATION_CREDENTIALS` set to `./secrets/[...].json` (override using `developmentRaw`).

- **Google OAuth**: (development of organizer-facing pages only) Following the instructions [here](http://www.passportjs.org/docs/google/):

  1. Enable [Google+ API from the Console](https://console.developers.google.com/apis/api/plus.googleapis.com/overview?project=mmb-staging)
  2. Once you have done the above, you should be able to turn on the [OAuth Conset screen](https://console.developers.google.com/apis/credentials/consent?project=mmb-staging)
  3. Once you have done the above, you should be able to create [OAuth Credentials](https://console.developers.google.com/apis/credentials?project=mmb-staging)

  Download and save these credentials for dev, prod, and staging.  Thes eare the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` fields.

For more details, check out [here](https://github.com/mail-my-ballot/mail-my-ballot/issues/30).

### Testing Individual services
To experiment with or verify an individual service, you can call the "prototype" files from the command line for the individual services, (e.g.):
```bash
yarn server gulp script --script src/service/mg.proto.ts --env development
```
To find a list of prototype calls, run:
```bash
git ls-files | grep proto
```

#### Google Maps API
You will have to enable Google Maps `geolocation` and `geocoding` APIs, then set `GOOGLE_MAPS_API_KEY` in order to do the ZIP code to state and address to election official lookups.  Instructions [here](https://developers.google.com/maps/documentation/geocoding/get-api-key).

#### Express session secrets
Set `SESSION_SECRET` to a random string of your choice to encrypt sessions.

## Repo Structure
The code is a lerna repo split into three packages:
- `packages/client`
- `packages/server`
- `packages/common` shared code symlinked between above to

Each package has it's own `gulpfile.js`.

### Running tasks
To invoke the grunt file, run commands like
```bash
yarn server gulp script --env development --file src/script/fetchData.ts
```

The command `yarn server gulp` and `yarn client gulp` run their respective gulpfiles.  Check out the gulpfiles for more commands.

### Checking repo
To check if the repo is working run the following four commands
```bash
yarn bootstrap && yarn build && yarn lint && yarn test
```
Please do this before you submit a PR.

## Adding a State
To add a new state, you will need to complete the following steps:
1. Increment version number and publish a new version of the [elections official data](https://github.com/mail-my-ballot/elections-officials), if you need updated data.
1. Match the version number in the environment variable `ELECTIONS_OFFICIALS_VERSION`, if you need updated data.
1. Add the state to `availableStates` and `implementedStates` const arrays in `common`.  This should start generating type errors from incomplete switch statements when you run
    ```bash
    yarn build
    ```
    Fixing those errors by pattern matching should get you a new state.  Becareful to follow the state-by-state regulations for VBM signup.  For reference, here are the core commits adding [Arizona](https://github.com/mail-my-ballot/mail-my-ballot/commit/arizona) and [New York](https://github.com/mail-my-ballot/mail-my-ballot/commit/new_york).

    Some states require us to fill out and submit their PDF form for the signup.  This means determining the `X/Y` coordinates for each input box.  Use the file `packages/server/src/service/pdfForm.proto.ts` as a test harness for laying out the application (see [New Hampshire](https://github.com/mail-my-ballot/mail-my-ballot/pull/33) for an example).


## Notes on Submitting Code
Please submit code via pull requests, ideally from this repo if you have access or from your own fork if you do not.
- We strive to only use [rebase merges](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)

## Hosting
The best way to showcase changes to your site is to host your own staging instance.  Each instance has its own configuration (e.g. `production` or `staging`) and can be edited via the gulpfile via `--env production`.  To add your own, copy and modify the contents the `staging` object in `env/env.js` using your own namespace (e.g. your GithubID).

### Now (Client Hosting)
The client is hosted by [Vercel](https://vercel.com/), which is also called Zeit and Now.  If you create and deploy to your own zeit hosting instance and point it to the dev or staging backend instance, you should be able to experiment / show off your own front-end.

### App Engine (Server Hosting)
To get started, goto [AppEngine Getting Started](https://console.cloud.google.com/appengine/start?project=mmb-staging&folder&organizationId) and follow the prompts.

Don't forget to set indexes.  To do this, run the command resulting from
```bash
yarn server gulp deploy-index --env [environment]
```
(see the gulp file server's `gulpfile.js`).

### Secrets in deployed App Engine
Configuration environment variables (and hence secrets) in Google Appengine is through `app.yaml`.  We do not store this in git so that secrets are not exposed.  Instead, we store `app.tmpl.yaml` without secrets and fill in the environment variables in `app.yaml` dynamically via gulp:
```bash
yarn server gulp appsubst --env staging [environment]
```
This is automatically run as a part of
```bash
yarn server gulp deploy --env staging [environment]
```

Alternative (not used): follow this [SO answer](https://stackoverflow.com/a/54055525/8930600), put all secrets in a special file that is not stored in source control.

## Web Data
### Development
- [Log Viewer](https://console.cloud.google.com/logs/viewer?project=mmb-dev-cee81)
- [Console](https://console.cloud.google.com/home/dashboard?project=mmb-dev-cee81)
- [Firestore Data Viewer](https://console.cloud.google.com/firestore/data?project=mmb-dev-cee81)
- [Storage Viewer](https://console.cloud.google.com/storage/browser?project=mmb-dev-cee81)
- [Firestore Permission Rules](https://console.firebase.google.com/u/0/project/mmb-dev-cee81/database/firestore/rules)
- [Quotas](https://console.cloud.google.com/iam-admin/quotas?project=mmb-dev-cee81)

### Staging
- [Log Viewer](https://console.cloud.google.com/logs/viewer?project=mmb-staging)
- [Console](https://console.cloud.google.com/home/dashboard?project=mmb-staging)
- [Firestore Data Viewer](https://console.cloud.google.com/firestore/data?project=mmb-staging)
- [Storage Viewer](https://console.cloud.google.com/storage/browser?project=mmb-staging)
- [Firestore Permission Rules](https://console.firebase.google.com/u/0/project/mmb-staging/database/firestore/rules)
- [Quotas](https://console.cloud.google.com/iam-admin/quotas?project=mmb-staging)

### Production
- [Log Viewer](https://console.cloud.google.com/logs/viewer?project=mmb-prod)
- [Console](https://console.cloud.google.com/home/dashboard?project=mmb-prod)
- [Firestore Data Viewer](https://console.cloud.google.com/firestore/data?project=mmb-prod)
- [Storage Viewer](https://console.cloud.google.com/storage/browser?project=mmb-prod)
- [Firestore Permission Rules](https://console.firebase.google.com/u/0/project/mmb-prod/database/firestore/rules)
- [Quotas](https://console.cloud.google.com/iam-admin/quotas?project=mmb-prod)

## Resources
### Asthetics
- [MUI CSS Colors](https://www.muicss.com/docs/v1/getting-started/colors)
- [Gradient Codegen](https://cssgradient.io/)

### Markdown Library
We're using [Marked](https://www.npmjs.com/package/marked), which has more dependents, downloads, and is smaller than [Showdown](https://www.npmjs.com/package/showdown).  The documentation on how to run it in node is available [here](https://marked.js.org/#/USING_ADVANCED.md#options)

### Notifications
We're using [Toast](https://www.npmjs.com/package/react-toastify) for notifications.  The general style is to not report success, occasionally report queries about loading, and always report errors.

## Elections Resources
### From Vote at Home Insitute
- [Vote by Mail in the Primary](https://www.voteathome.org/wp-content/uploads/2019/08/2020-Presidential-Primary-Guide-to-Mail-Ballot-Voting.pdf)
- [Vote by Mail in the General Election](https://www.voteathome.org/wp-content/uploads/2019/07/NVAHI-Guide-to-When_How-to-Apply-2020.pdf)
- [Ballot Ready COVID-19](https://docs.google.com/spreadsheets/d/1nCgI28asUZi4FVihJd4YbjfdSUC4K3SMEECsMpyaQQE/edit?ts=5e8fa7d8#gid=1917493118)

## About Us
This repository is for [MailMyBallot.org](https://mailmyballot.org), a [National Vote at Home Institute](https://voteathome.org) project.

## Contributors
- [tianhuil](https://github.com/tianhuil/)
