import fs from 'fs'
import { DataFrame } from 'data-forge'

import { FirestoreService } from "../service/firestore"
import { RichStateInfo, Org, User } from "../service/types"

const firestore = new FirestoreService()
const main = async() => {
  const env = process.argv[2]

  const [
    stateInfo,
    user,
    org,
  ] = await Promise.all([
    firestore.query<RichStateInfo>(
      firestore.db.collection('StateInfo')
        .orderBy('created', 'asc')
    ),
    firestore.query<User>(firestore.db.collection('User')),
    firestore.query<Org>(firestore.db.collection('Org')),
  ])

  const date = new Date().toISOString()

  const filename = __dirname + `/data/infos-${env}-${date}.json`
  fs.writeFileSync(filename, JSON.stringify({
    stateInfo,
    user,
    org,
  }))

  console.log(`Writing results to ${filename}`)
  console.log(`${stateInfo.length} voters written`)
  console.log(`${user.length} users written`)
  console.log(`${org.length} orgs written`)

  const df = new DataFrame(user)
  const res = df.select(u => u.emails[0].value).toArray()
  console.log(res)
}

main()
