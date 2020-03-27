import * as admin from 'firebase-admin'
import { StateInfo } from '../common'

export interface User {
  displayName: string
  name?: {
      familyName: string
      givenName: string
      middleName?: string
  }
  emails: Array<{
      value: string
      type?: string
  }>
  accessToken: string
  refreshToken: string
  roles: Array<string>
}

export interface Role {
  org: string
  admin: boolean
  pending?: boolean
}

export type RichStateInfo = StateInfo & { created: admin.firestore.Timestamp }
