import * as admin from 'firebase-admin'

import { processEnvOrThrow, RawLocale, Locale } from '@vbm/common'

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

  async addLocale(rawLocale: RawLocale): Promise<string> {
    const doc = await this.db.collection('Locale').add(rawLocale)
    return doc.id
  }
}
