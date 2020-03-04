# vbm

## Manual Dependencies
Almost all dependnecies are listed in devDependencies.  However,
- you will need to install now globally (`npm i -g now`).

To deploy the server using Google Cloud, follow the steps in `https://cloud.google.com/appengine/docs/standard/nodejs/quickstart`.


## Secrets
### Secrets in Dev
Put all secrets in `env/.env.development`, which is not checked into source control

#### Dev Firestore Access
Goto the [Firebase Console](https://console.firebase.google.com/u/0/project/vbm-test-dev/settings/serviceaccounts/adminsdk) and generate a new key and place it in `./env/secrets/[...].json`.
Then make sure `.env.development` has `GOOGLE_APPLICATION_CREDENTIALS` set to `../../env/secrets/[...].json`.

### Secrets in Production
Following this [SO answer](https://stackoverflow.com/a/54055525/8930600), put all secrets in a special file that is not stored in source control.

## Markdown Library
We're using [Marked](https://www.npmjs.com/package/marked), which has more dependents, downloads, and is smaller than [Showdown](https://www.npmjs.com/package/showdown).  The documentation on how to run it in node is available [here](https://marked.js.org/#/USING_ADVANCED.md#options)

## Production
**Useful Links:**
- [Log Viewer](https://console.cloud.google.com/logs/viewer)
- [Console](https://console.cloud.google.com/home/dashboard?project=vbm-test-dev)
- [Firestore Data Viewer](https://console.cloud.google.com/firestore/data?project=vbm-test-dev)

## TODO
- [x] Deploy client and server and get working on staging
- [ ] Setup FL Code, handle other states
- [ ] Setup FL By County Code
- [ ] Setup Email Code
- [ ] Buy Domain
- [ ] Setup Production
