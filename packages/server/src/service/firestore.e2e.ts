import * as firebase from '@firebase/testing'

import { FirestoreService } from './firestore'

const projectId = 'new-test'


describe('Firestore methods', () => {
  let fs: FirestoreService
  let uids: string[]

  const org = 'org'
  const profiles = [
    {
      provider: 'google',
      id: '0',
      displayName: 'Bob'
    },
    {
      provider: 'google',
      id: '1',
      displayName: 'Jane'
    },
  ]
  

  beforeAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()))
    fs = new FirestoreService(projectId)
    uids = profiles.map(({provider, id}) => fs.uid(provider, id))
  })

  beforeEach(async () => {
    await firebase.clearFirestoreData({projectId})
    await Promise.all(profiles.map(
      profile => fs.newUser(
        profile,
        'accessToken',
        'refreshToken',
      )
    ))
    await fs.claimNewOrg(uids[0], org)
  })

  test('claimNewOrg method can claim org the first time', async () => {
    // Can claim org first time
    expect(await fs.claimNewOrg(uids[0], 'new_org')).toBe(true)
    expect((await fs.query(
      fs.db.collectionGroup('Role')
        .where('org', '==', 'new_org')
    ))).toHaveLength(1)
  })

  test('claimNewOrg method can claim org the first time', async () => {
    expect(await fs.claimNewOrg(uids[1], org)).toBe(false)
    expect((await fs.query(fs.db.collectionGroup('Role')))).toHaveLength(1)
  })

  test('user can view their own org\'s registrations', async () => {
    expect(await fs.addRegistration({
      org,
      name: 'Bob',
    } as any)).toBeTruthy()

    expect(await fs.fetchRegistrations(uids[0], org)).toHaveLength(1)
  })

  test('user cannot view another org\'s registrations', async () => {
    expect(await fs.addRegistration({
      org: 'new_org',
      name: 'Bob',
    } as any)).toBeTruthy()

    expect(await fs.fetchRegistrations(uids[0], 'new_org')).toBeNull()
  })
})
