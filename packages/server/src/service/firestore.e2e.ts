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

  test('claimNewOrg method can claim a new org', async () => {
    await fs.claimNewOrg(uids[0], 'new_org')
    const org = await fs.fetchOrg('new_org')
    expect(org).toBeTruthy()
    expect(org?.user.admins).toStrictEqual([uids[0]])
  })

  test('claimNewOrg method cannot claim an already-claimed org', async () => {
    await expect(fs.claimNewOrg(uids[1], org)).rejects.toThrow()
    await expect((fs.query(fs.db.collectionGroup('Org')))).resolves.toHaveLength(1)
  })

  test('user can view their own org\'s registrations', async () => {
    expect(await fs.addRegistration({
      org,
      name: 'Bob',
    } as any)).toBeTruthy()

    await expect(fs.fetchRegistrations(uids[0], org)).resolves.toHaveLength(1)
  })

  test('user cannot view another org\'s registrations', async () => {
    await expect(
      fs.addRegistration({
        org: 'new_org',
        name: 'Bob',
      } as any)
    ).resolves.toBeTruthy()

    await expect(fs.fetchRegistrations(uids[0], 'new_org')).resolves.toBeNull()
  })

  test('cannot accpet non-existent org', async() => {
    await expect(fs.acceptRole(uids[1], 'nonexistent_org')).resolves.toBe(false)
  })

  test('can accept a pending org', async() => {
    await expect(fs.grantExistingOrg(uids[0], uids[1], org)).resolves.toBe(true)
    await expect(fs.acceptRole(uids[1], org)).resolves.toBe(true)
  })
})
