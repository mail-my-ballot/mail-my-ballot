import { renderHook, act } from '@testing-library/react-hooks'
import { VoterContainer } from './voter'

describe('testing VoterContainer', () => {
  test('data can be created', () => {
    const { result } = renderHook(
      () => VoterContainer.useContainer(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { wrapper: VoterContainer.Provider as any }
    )
    const uid = result.current.voter.uid
    expect(uid.length).toBeGreaterThan(5)

    // Assigning a new field updates it
    act(// eslint-disable-next-line @typescript-eslint/camelcase
      () => result.current.conservativeUpdateVoter({utmCampaign: 'c1'})
    )
    expect(result.current.voter.utmCampaign).toBe('c1')

    // Assigning again doesn't do anything
    act(// eslint-disable-next-line @typescript-eslint/camelcase
      () => result.current.conservativeUpdateVoter({utmCampaign: 'c2'})
    )
    expect(result.current.voter.utmCampaign).toBe('c1')

    // rerender does not trigger a new uid
    const { result: result2 } = renderHook(
      () => VoterContainer.useContainer(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { wrapper: VoterContainer.Provider as any }
    )
    const uid2 = result2.current.voter.uid
    expect(uid).toBe(uid2)
  })
})
