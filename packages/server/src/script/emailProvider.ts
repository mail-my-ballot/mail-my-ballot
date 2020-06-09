import { DataFrame } from 'data-forge'

import { FirestoreService } from "../service/firestore"
import { RichStateInfo } from "../service/types"

const firestore = new FirestoreService()
const main = async() => {
  const stateInfo = await (firestore.query<RichStateInfo>(
    firestore.db.collection('StateInfo')
      .orderBy('created', 'asc')
  ))
  
  const df = new DataFrame(stateInfo)
  const csv = df.groupBy(row => row.oid)
    .select((group) => ({
      oid: group.first().oid,
      count: group.count(),
    }))
    .inflate()
    .toCSV()
  console.log(csv)
}

main()
