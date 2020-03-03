# vbm


## Secrets
Goto the [Firebase Console](https://console.firebase.google.com/u/0/project/vbm-test-dev/settings/serviceaccounts/adminsdk) and generate a new key and place it in `./env/secrets/[...].json`.
Then make sure `.env.development` has `GOOGLE_APPLICATION_CREDENTIALS` set to `../../env/secrets/[...].json`.

## Markdown Library
We're using [Marked](https://www.npmjs.com/package/marked), which has more dependents, downloads, and is smaller than [Showdown](https://www.npmjs.com/package/showdown).  The documentation on how to run it in node is available [here](https://marked.js.org/#/USING_ADVANCED.md#options)
