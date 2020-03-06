import * as admin from 'firebase-admin'

import { processEnvOrThrow, WithoutId, Address, RegistrationInfo, WithId } from '../common'

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

  async addLocale(address: WithoutId<Address>): Promise<string> {
    const doc = await this.db.collection('Address').add(address)
    return doc.id
  }

  async addRegistration(info: RegistrationInfo): Promise<string> {
    const doc = await this.db.collection('RegistrationInfo').add(info)
    return doc.id
  }

  async getRegistration(id: string): Promise<WithId<RegistrationInfo> | null> {
    const snap = await this.db.collection('RegistrationInfo').doc('' + id).get()
    const doc = snap.data()
    if (doc) {
      return doc as WithId<RegistrationInfo>
    } else {
      return null
    }
  }
}

export const firestoreService = new FirestoreService()
