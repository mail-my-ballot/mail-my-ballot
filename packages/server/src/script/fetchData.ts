import fs from 'fs'

import { FirestoreService } from "../service/firestore"
import { RichStateInfo } from "../service/types"

const firestore = new FirestoreService()
const main = async() => {
  const env = process.argv[2]
  const infos = await firestore.query<RichStateInfo>(
    firestore.db.collection('StateInfo')
      .orderBy('created', 'asc')
  )
  
  const date = new Date().toISOString()
  const filename = __dirname + `/data/infos-${env}-${date}.json`
  fs.writeFileSync(filename, JSON.stringify(infos))
  
  console.log(`${infos.length} results written to ${filename}`)
}

main()
