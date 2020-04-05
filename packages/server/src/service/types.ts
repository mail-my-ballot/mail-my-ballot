import * as admin from 'firebase-admin'
import { State, StateInfo, _Id } from '../common'

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
  user: {
    owner: string     // Only single owner (creator)
    admins: string[]   // Owner always admin
    members: string[]  // Admins always members
    pendings: string[] // pending is mutually exclusive with other groups
  }
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}

export interface Counter extends _Id, PartialRecord<State, number> {}

export type RichStateInfo = StateInfo & { created: admin.firestore.Timestamp }
