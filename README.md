# vbm


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


## TODO
- Deploy client and server and get working
- Setup FL Code, handle other states
- Setup FL County Code
- Setup Email Code
- Buy Domain
- Setup Staging
