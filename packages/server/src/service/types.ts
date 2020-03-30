import * as admin from 'firebase-admin'
import { StateInfo } from '../common'

// main colleciton
export interface User {
  displayName: string
  emails: Array<{
      value: string
      type?: string
  }>
  accessToken: string
  refreshToken: string
}

// subcollection
export interface Role {
  org: string
  admin: boolean
  pending?: boolean
}

export type RichStateInfo = StateInfo & { created: admin.firestore.Timestamp }
