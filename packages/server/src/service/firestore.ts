import * as admin from 'firebase-admin'

import { processEnvOrThrow, StateInfo, _Id, WithId } from '../common'
import { Profile } from 'passport'
import { User, RichStateInfo, Org } from './types'

type DocumentReference = admin.firestore.DocumentReference<admin.firestore.DocumentData>
type Query = admin.firestore.Query<admin.firestore.DocumentData>
type DocumentSnapshot = admin.firestore.DocumentSnapshot
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
  private withId<T extends {}>(snap: DocumentSnapshot): WithId<T> | null {
    const doc = snap.data() as T | undefined
    return doc ? {...doc, id: snap.id} : null
  }

  private async get<T extends {}>(ref: DocumentReference, trans?: Transaction): Promise<WithId<T> | null> {
    const snap = await (trans ? trans.get(ref) : ref.get())
    return this.withId(snap)
  }

  async getAll<T extends {}>(refs: DocumentReference[], trans?: Transaction): Promise<Array<WithId<T> | null>> {
    if (refs.length === 0) return []
    const snaps = await (trans ? trans.getAll<T>(...refs) : this.db.getAll(...refs))
    return snaps.map(snap => this.withId<T>(snap))
  }

  async query<T extends {}>(ref: Query, trans?: Transaction): Promise<WithId<T>[]> {
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

  orgRef(org: string): DocumentReference {
    return this.db.collection('Org').doc(org)
  }

  async fetchUser(uid: string, trans?: Transaction): Promise<User | null> {
    return this.get<User>(this.userRef(uid), trans)
  }

  async fetchOrg(org: string, trans?: Transaction): Promise<Org | null> {
    return this.get<Org>(this.orgRef(org), trans)
  }

  async fetchUserOrgs(uid: string, trans?: Transaction): Promise<Org[]> {
    const [orgs1, orgs2] = await Promise.all([
      this.query<Org>(this.db.collection('Org').where('user.members', 'array-contains', uid), trans),
      this.query<Org>(this.db.collection('Org').where('user.pendings', 'array-contains', uid), trans),
    ])
    return [...orgs1, ...orgs2]
  }

  async fetchOrgUsers(org: string, trans?: Transaction): Promise<WithId<User>[]> {
    const orgObj = await this.fetchOrg(org)
    if (!orgObj) return []
    const userRefs = [
      ...orgObj.user.members.map(uid => this.userRef(uid)),
      ...orgObj.user.pendings.map(uid => this.userRef(uid))
    ]
    const users = await this.getAll<User>(userRefs, trans)
    return users.filter((u): u is WithId<User> => !!u)
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
  async claimNewOrg(uid: string, org: string): Promise<void> {
    const newOrg: Org = {
      user: {
        owner: uid,
        admins: [uid],
        members: [uid],
        pendings: []
      }
    }
    await this.orgRef(org).create(newOrg)
  }
  
  // user grants another user role in an org where they are an admin
  async grantExistingOrg(adminUid: string, newUid: string, org: string): Promise<boolean> {
    return this.db.runTransaction(async trans => {
      const orgObj = await this.fetchOrg(org, trans)
      if (!orgObj) return false
      if (!orgObj.user.admins.includes(adminUid)) return false
      orgObj.user.pendings = [...orgObj.user.pendings, newUid]
      trans.update(this.orgRef(org), orgObj)
      return true
    })
  }

  async acceptRole(uid: string, org:string): Promise<boolean> {
    return this.db.runTransaction(async trans => {
      const orgObj = await this.fetchOrg(org, trans)
      if (!orgObj) return false
      if (!orgObj.user.pendings.includes(uid)) return false
      orgObj.user.members = [...orgObj.user.members, uid]
      orgObj.user.pendings = orgObj.user.pendings.filter(user => user != uid)
      return true
    })
  }

  // user pulls all registration from org
  async fetchRegistrations(uid: string, org: string, limit = 5000): Promise<RichStateInfo[] | null> {
    const orgObj = await this.fetchOrg(org)
    if (!orgObj) return null
    if (!orgObj.user.members.includes(uid)) return null
    return this.query<RichStateInfo>(
      this.db.collection('StateInfo')
        .where('org', '==', org)
        .orderBy('created', 'asc')
        .limit(limit)
    )
  }
}
