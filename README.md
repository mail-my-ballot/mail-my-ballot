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
- [Firestore Permission Rules](https://console.firebase.google.com/u/0/project/vbm-test-dev/database/firestore/rules)

## Asthetics
- [MUI CSS Colors](https://www.muicss.com/docs/v1/getting-started/colors)
- [Gradient Codegen](https://cssgradient.io/)

# Elections Resources
## From Vote at Home Insitute
- [Vote by Mail in the Primary](https://www.voteathome.org/wp-content/uploads/2019/08/2020-Presidential-Primary-Guide-to-Mail-Ballot-Voting.pdf)
- [Vote by Mail in the General Election](https://www.voteathome.org/wp-content/uploads/2019/07/NVAHI-Guide-to-When_How-to-Apply-2020.pdf)

## Florida
- [Vote by Mail](https://dos.myflorida.com/elections/for-voters/voting/vote-by-mail/)
- [County Supervisors](https://dos.elections.myflorida.com/supervisors/)
- Some useful addresses:
  - 100 S Biscayne Blvd, Miami, FL 33131
  - 5443 Main St, Port Richey, FL 34652
  - 2000 W Commercial Blvd, Fort Lauderdale, FL 33309

## Michigan
- They seem to accept email applications [Election Official's Manual](https://www.michigan.gov/documents/sos/VI_Michigans_Absentee_Voting_Process_265992_7.pdf)
- "Michigan residents who live in unincorporated places register to vote with their township clerk": [MI SOS](https://www.michigan.gov/documents/sos/ED-106_Circulating_CityTwp_Nom_+_Qual_Pet_Forms_647901_7.pdf)
- There is a St. Joseph Township and City, both in Berrien County.  They share a zipcode (Wikipedia [Township](https://en.wikipedia.org/wiki/St._Joseph_Charter_Township,_Michigan), [City](https://en.wikipedia.org/wiki/St._Joseph,_Michigan))

# Issues with Geocoding
- Cannot find 135 SE Martin Luther King, Jr. Blvd. Stuart, FL 34994 (https://dos.elections.myflorida.com/supervisors/countyInfo.asp?county=MRT)

