import * as admin from 'firebase-admin'

import { processEnvOrThrow, StateInfo } from '../common'
import { Profile } from 'passport'
import { User, Role, RichStateInfo } from './types'

type DocumentReference = admin.firestore.DocumentReference<admin.firestore.DocumentData>
type Query = admin.firestore.Query<admin.firestore.DocumentData>
type Transaction = admin.firestore.Transaction

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

  async addRegistration(info: StateInfo): Promise<string> {
    const richInfo: RichStateInfo = {
      ...info,
      created: admin.firestore.Timestamp.fromDate(new Date())
    }
    const { id } = await this.db.collection('StateInfo').add(richInfo)
    return id
  }

  private async get<T>(ref: DocumentReference, trans?: Transaction): Promise<T | null> {
    const snap = await (trans ? trans.get(ref) : ref.get())
    const doc = snap.data() as T | undefined
    return doc || null
  }

  private async getAll<T>(refs: DocumentReference[], trans?: Transaction): Promise<Array<T | null>> {
    refs.map(v => v)
    const snaps = await (trans ? trans.getAll(...refs) : this.db.getAll(...refs))
    const docs = snaps.map(snap => snap.data() as T | undefined)
    return docs.map(doc => doc || null)
  }

  private async query<T>(ref: Query, trans?: Transaction): Promise<Array<T>> {
    const snap = await (trans ? trans.get(ref) : ref.get())
    return snap.docs.map(doc => doc.data as unknown as T)
  }

  async getRegistration(id: string): Promise<RichStateInfo | null> {
    return this.get(this.db.collection('StateInfo').doc('' + id))
  }

  async getUserRoles(uid: string, trans?: Transaction): Promise<[User | null, Array<Role | null>]> {
    const userRef = this.db.collection('User').doc(uid)
    const user = await this.get<User>(userRef, trans)

    if (!user) return [null, []]

    return [
      user,
      await this.getAll<Role>(user.roles.map(id => this.db.collection('Role').doc(id)), trans)
    ]
  }

  // user queries

  // new user
  async newUser(
    {
      provider,
      id,
      displayName,
      name,
      emails
    }: Profile,
    accessToken: string,
    refreshToken: string,
  ): Promise<string> {
    const user: User = {
      displayName,
      name,
      emails: emails || [],
      accessToken,
      refreshToken,
      roles: [],
    }
    const uid = `${provider}/${id}`
    await this.db.collection('User').doc(uid).set(user)
    return uid
  }
  
  // claim (globally unique) org as role
  async claimNewOrg(uid: string, org: string): Promise<string | null> {
    const roleRef = this.db.collection('Role').where('org', '==', org)
    const userRef = this.db.collection('User').doc(uid)
    const newRole: Role = {
      org,
      admin: true,
    }

    return this.db.runTransaction(async t => {
      const [roles, user] = await Promise.all([
        this.query<Role>(roleRef, t),
        this.get<User>(userRef, t),
      ])

      if (roles || !user) return null

      const doc = await this.db.collection('Role').add(newRole)
      await userRef.update({roles: [...user.roles, doc.id]})
      return doc.id
    })
  }
  
  // user grants another user role in an org where they are an admin
  async grantExistingOrg(adminUid: string, newUid: string, org: string): Promise<string | null> {
    const newUserRef = this.db.collection('User').doc(newUid)
    const newRole: Role = {
      org,
      admin: true,
      pending: false,
    }

    return this.db.runTransaction(async t => {
      const [[_, adminRoles], [newUser, newUserRoles]] = await Promise.all([
        this.getUserRoles(adminUid),
        this.getUserRoles(newUid),
      ])

      // admin user must be an admin for this org
      if (!adminRoles || !(adminRoles.some(role => role && role.admin && role.org === org))) return null

      // new users must exist
      if (!newUser) return null

      // newUser must not have existing role
      if (newUserRoles && !newUserRoles.every(role => !role || role.org !== org)) return null

      const doc = await this.db.collection('Role').add(newRole)
      await newUserRef.update({roles: [...newUser.roles, doc.id]})
      return doc.id
    })
  }

  // user pulls all registration from org
  async fetchRegistrations(uid: string, org: string, limit = 5000): Promise<Array<RichStateInfo> | null> {
    const [_, roles] = await this.getUserRoles(uid)
    if (!roles.some(role => role && role.org === org)) return null
    return this.query<RichStateInfo>(
      this.db.collection('StateInfo')
        .where('org', '==', org)
        .orderBy('created', 'asc')
        .limit(limit)
    )
  }
}

export const firestoreService = new FirestoreService()
