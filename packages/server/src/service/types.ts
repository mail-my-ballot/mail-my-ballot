import * as admin from 'firebase-admin'
import { StateInfo, _Id } from '../common'

// main colleciton
export interface User extends _Id {
  displayName: string
  emails: Array<{
      value: string
      type?: string
  }>
  accessToken: string
  refreshToken: string
}

// subcollection
export interface Org extends _Id {
  facebookId?: string
  googleId?: string
  user: {
    owner: string     // Only single owner (creator)
    admins: string[]   // Owner always admin
    members: string[]  // Admins always members
    pendings: string[] // pending is mutually exclusive with other groups
  }
}

export type RichStateInfo = StateInfo & { created: admin.firestore.Timestamp }
