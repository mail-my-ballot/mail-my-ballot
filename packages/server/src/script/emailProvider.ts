import DataFrame from 'dataframe-js'

import { FirestoreService } from "../service/firestore"
import { RichStateInfo } from "../service/types"

const firestore = new FirestoreService()
const main = async() => {
  const users = await (firestore.query<RichStateInfo>(
    firestore.db.collection('StateInfo')
      .orderBy('created', 'asc')
  ))

  const users = await (firestore.query<RichStateInfo>(
    firestore.db.collection('StateInfo')
      .orderBy('created', 'asc')
  ))
  
  const df = new DataFrame(users, ['name', 'email', 'oid'])
  const res = df.groupBy('oid')
    .aggregate((group) => group.count())
    .rename('aggregation', 'oidCount')
    .toCSV(true)
  console.log(res)
}

main()
