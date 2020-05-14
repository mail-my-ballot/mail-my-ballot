import * as firebase from '@firebase/testing'

import { FirestoreService } from './firestore'
import { RichStateInfo } from './types'

const projectId = 'new-test'


let fs: FirestoreService
let uids: string[]

const oid = 'org'
const profiles = [0,1,2].map(i => ({
  provider: 'google',
  id: i.toString(),
  displayName: `Bob${i}`
}))


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
  await fs.claimNewOrg(uids[0], oid)
})

describe('FirestoreService.claimNewOrg method', () => {
  test('can claim a new org', async () => {
    await expect(fs.claimNewOrg(uids[0], 'new_org')).resolves.toBe(true)
    const org = await fs.fetchOrg('new_org')
    expect(org).toBeTruthy()
    expect(org?.user.admins).toStrictEqual([uids[0]])
  })

  test('cannot claim an already-claimed org', async () => {
    await expect(fs.claimNewOrg(uids[1], oid)).resolves.toBe(false)
    await expect((fs.query(fs.db.collectionGroup('Org')))).resolves.toHaveLength(1)
  })
})

describe('Viewing Data', () => {
  test('user can update and view their own org\'s registrations', async () => {
    const id = await fs.addRegistration({
      oid,
      name: 'Bob',
      state: 'Florida',
    } as RichStateInfo)
    expect(id).toBeTruthy()

    const richInfos = await fs.fetchRegistrations(uids[0], oid)
    expect(richInfos).toBeTruthy()
    expect(richInfos).toHaveLength(1)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const richInfo = richInfos![0]
    expect(richInfo.mgResponse).toBeUndefined()
    expect(richInfo.twilioResponses).toBeUndefined()

    fs.updateRegistration(
      id, 
      {message: 'message', id: '123'},
      []
    )

    const richInfos2 = await fs.fetchRegistrations(uids[0], oid)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const richInfo2 = richInfos2![0]
    expect(richInfo2.mgResponse).toEqual({message: 'message', id: '123'})
    expect(richInfo2.twilioResponses).toHaveLength(0)

  })

  test('user cannot view another org\'s registrations', async () => {
    await expect(
      fs.addRegistration({
        oid: 'new_org',
        name: 'Bob',
        state: 'Florida',
      } as RichStateInfo)
    ).resolves.toBeTruthy()

    await expect(fs.fetchRegistrations(uids[0], 'new_org')).resolves.toBeNull()
  })
})

describe('roles and permissions', () => {
  test('cannot accept non-existent org', async() => {
    await expect(fs.acceptOrg(uids[1], 'nonexistent_org')).resolves.toBe(false)
  })

  test('can grant permissions and accept a pending org', async() => {
    await expect(fs.grantExistingOrg(uids[0], uids[1], oid)).resolves.toBe(true)
    await expect(fs.acceptOrg(uids[1], oid)).resolves.toBe(true)
  })

  test('cannot grant for a non-existent org', async() => {
    await expect(fs.grantExistingOrg(uids[0], uids[1], 'new_org')).resolves.toBe(false)
  })

  test('cannot grant for an org where user is not a member', async() => {
    await expect(fs.grantExistingOrg(uids[1], uids[2], oid)).resolves.toBe(false)
  })

  test('cannot grant for an org where user is a member but not an admin', async() => {
    await expect(fs.grantExistingOrg(uids[0], uids[1], oid)).resolves.toBe(true)
    await expect(fs.acceptOrg(uids[1], oid)).resolves.toBe(true)
    await expect(fs.grantExistingOrg(uids[1], uids[2], oid)).resolves.toBe(false)
  })
})
