import { renderHook, act } from '@testing-library/react-hooks'
import { UserContainer } from './user'

describe('testing user container', () => {
  test('data can be created', () => {
    const { result } = renderHook(
      () => UserContainer.useContainer(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { wrapper: UserContainer.Provider as any }
    )
    const uid = result.current.userData.uid
    expect(uid.length).toBeGreaterThan(5)

    // Assigning a new field updates it
    act(// eslint-disable-next-line @typescript-eslint/camelcase
      () => result.current.conservativeUpdateUserData({utmCampaign: 'c1'})
    )
    expect(result.current.userData.utmCampaign).toBe('c1')

    // Assigning again doesn't do anything
    act(// eslint-disable-next-line @typescript-eslint/camelcase
      () => result.current.conservativeUpdateUserData({utmCampaign: 'c2'})
    )
    expect(result.current.userData.utmCampaign).toBe('c1')

    // rerende does not trigger a new uid
    const { result: result2 } = renderHook(
      () => UserContainer.useContainer(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { wrapper: UserContainer.Provider as any }
    )
    const uid2 = result2.current.userData.uid
    expect(uid).toBe(uid2)
  })
})
