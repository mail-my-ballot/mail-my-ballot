import * as admin from 'firebase-admin'

import { processEnvOrThrow, StateInfo } from '../common'
import { Profile } from 'passport'
import { User, Role, RichStateInfo } from './types'

type DocumentReference = admin.firestore.DocumentReference<admin.firestore.DocumentData>
type Query = admin.firestore.Query<admin.firestore.DocumentData>
type Transaction = admin.firestore.Transaction

export class FirestoreService {
  db: admin.firestore.Firestore

  // Firebase generates a warning if `admin.initializeApp` is called multiple times
  // However, if `projectId` is provided, (e.g. for testing), we do want to initialize app
  // 
  // Warning Below:
  // 
  // The default Firebase app already exists. This means you called initializeApp()
  // more than once without providing an app name as the second argument. In most
  // cases you only need to call initializeApp() once.But if you do want to initialize
  // multiple apps, pass a second argument to initializeApp() to give each app a
  // unique name.

  // https://stackoverflow.com/questions/57763991/initializeapp-when-adding-firebase-to-app-and-to-server
  constructor(projectId?: string) {
    if (projectId === undefined) {
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
          databaseURL: processEnvOrThrow('FIRESTORE_URL'),
        })
      }
  
      this.db = admin.firestore()
    } else {
      this.db = admin.initializeApp({
        projectId,
        credential: admin.credential.applicationDefault(),
        databaseURL: processEnvOrThrow('FIRESTORE_URL'),
      }).firestore()
    }
  }

  async addRegistration(info: StateInfo): Promise<string> {
    const richInfo: RichStateInfo = {
      ...info,
      created: admin.firestore.Timestamp.fromDate(new Date())
    }
    const { id } = await this.db.collection('StateInfo').add(richInfo)
    return id
  }

  // user helpers

  private async get<T>(ref: DocumentReference, trans?: Transaction): Promise<T | null> {
    const snap = await (trans ? trans.get(ref) : ref.get())
    const doc = snap.data() as T | undefined
    return doc || null
  }

  async getAll<T>(refs: DocumentReference[], trans?: Transaction): Promise<Array<T | null>> {
    if (refs.length === 0) return []
    const snaps = await (trans ? trans.getAll(...refs) : this.db.getAll(...refs))
    const docs = snaps.map(snap => snap.data() as T | undefined)
    return docs.map(doc => doc || null)
  }

  async query<T extends {}>(ref: Query, trans?: Transaction): Promise<T []> {
    const snap = await (trans ? trans.get(ref) : ref.get())
    return snap.docs.map(doc => {
      return {
        ...doc.data() as unknown as T,
        id: doc.id
      } 
    })
  }

  async getRegistration(id: string): Promise<RichStateInfo | null> {
    return this.get(this.db.collection('StateInfo').doc('' + id))
  }

  // user queries
  uid(provider: string, id: string) {
    return `${provider}:${id}`
  }

  userRef(uid: string): DocumentReference
  userRef(provider: string, id: string): DocumentReference
  userRef(...arg: [string] | [string, string]): DocumentReference {
    switch (arg.length) {
      case 1: {
        const [uid] = arg
        return this.db.collection('User').doc(uid)
      }
      case 2: {
        const [provider, id] = arg
        return this.db.collection('User').doc(this.uid(provider, id))
      }
    }
  }

  roleRef(uid: string, org: string): DocumentReference {
    return this.db.collection('User').doc(uid).collection('Role').doc(org)
  }

  // user role
  async userRole(uid: string, org: string): Promise<boolean> {
    const role = await this.get<Role>(this.roleRef(uid, org))
    return (!!role && !role.pending)
  }

  async getUserRoles(uid: string): Promise<[User | null, Role[] | null]> {
    return Promise.all([
      this.get<User>(this.userRef(uid)),
      this.query<Role>(this.userRef(uid).collection('Role')),
    ])
  }

  // new user
  async newUser(
    {
      provider,
      id,
      displayName,
      emails
    }: Profile,
    accessToken: string,
    refreshToken: string,
  ): Promise<string> {
    const user: User = {
      displayName,
      emails: emails || [],
      accessToken,
      refreshToken,
    }
    const uid = this.uid(provider, id)
    await this.userRef(uid).set(user, { merge: true })
    return uid
  }
  
  // claim (globally unique) org as role
  async claimNewOrg(uid: string, org: string): Promise<boolean> {
    const roleQuery = this.db.collectionGroup('Role').where('org', '==', org)
    const newRoleRef = this.roleRef(uid, org)
    const newRole: Role = {
      org,
      admin: true,
    }
    return this.db.runTransaction(async t => {
      const roles = await this.query<Role>(roleQuery, t)

      // if existing role for this org, cannot claim as a new org
      if (roles.length > 0) return false

      t.create(newRoleRef, newRole)
      return true
    })
  }
  
  // user grants another user role in an org where they are an admin
  async grantExistingOrg(adminUid: string, newUid: string, org: string): Promise<boolean> {
    const adminRoleRef = this.roleRef(adminUid, org)
    const newRoleRef = this.roleRef(newUid, org)
    const newRole: Role = {
      org,
      admin: true,
      pending: false,
    }

    return this.db.runTransaction(async t => {
      const adminRole = await this.get<Role>(adminRoleRef, t)

      // admin user must be an admin for this org
      if (!adminRole || !adminRole.admin) return false

      t.create(newRoleRef, newRole)
      return true
    })
  }

  async acceptRole(uid: string, org:string): Promise<boolean> {
    await this.roleRef(uid, org).update({pending: false})
    return true
  }

  // user pulls all registration from org
  async fetchRegistrations(uid: string, org: string, limit = 5000): Promise<RichStateInfo[] | null> {
    const role = await this.get<Role>(this.roleRef(uid, org))
    if (!role) return null
    return this.query<RichStateInfo>(
      this.db.collection('StateInfo')
        .where('org', '==', org)
        .orderBy('created', 'asc')
        .limit(limit)
    )
  }
}
