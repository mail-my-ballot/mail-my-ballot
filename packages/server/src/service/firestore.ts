import * as admin from 'firebase-admin'

import { processEnvOrThrow, WithoutId, Address, StateInfo, WithId } from '../common'

class FirestoreService {
  db: admin.firestore.Firestore

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: processEnvOrThrow('FIRESTORE_URL'),
      })
    }

    this.db = admin.firestore()
  }

  async addAddress(address: WithoutId<Address>): Promise<string> {
    const doc = await this.db.collection('Address').add(address)
    return doc.id
  }

  async addRegistration(info: StateInfo): Promise<string> {
    const doc = await this.db.collection('StateInfo').add(info)
    return doc.id
  }

  async getRegistration(id: string): Promise<WithId<StateInfo> | null> {
    const snap = await this.db.collection('StateInfo').doc('' + id).get()
    const doc = snap.data()
    if (doc) {
      return doc as WithId<StateInfo>
    } else {
      return null
    }
  }
}

export const firestoreService = new FirestoreService()
