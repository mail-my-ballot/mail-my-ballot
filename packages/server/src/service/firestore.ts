import * as admin from 'firebase-admin'

import { processEnvOrThrow, WithoutId, Locale } from '../common'

export class FirestoreService {
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

  async addLocale(locale: WithoutId<Locale>): Promise<string> {
    const doc = await this.db.collection('Locale').add(locale)
    return doc.id
  }
}
