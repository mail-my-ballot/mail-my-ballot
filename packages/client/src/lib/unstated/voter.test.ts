import { renderHook, act } from '@testing-library/react-hooks'
import { mocked } from 'ts-jest/utils'

import { VoterContainer } from './voter'
import { useAppHistory } from '../path'
jest.mock('../path')

const renderWithMockedQuery = (query: Record<string, string>) => {
  mocked(useAppHistory).mockReturnValue({query} as ReturnType<typeof useAppHistory>)

  return renderHook(
    () => VoterContainer.useContainer(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { wrapper: VoterContainer.Provider as any }
  )
}

describe('testing VoterContainer', () => {
  test('data can be created', () => {
    const { result } = renderWithMockedQuery({})
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
    const { result: result2 } = renderWithMockedQuery({})
    const uid2 = result2.current.voter.uid
    expect(uid).toBe(uid2)
  })

  test('test overriding experiments', () => {
    const { result } = renderWithMockedQuery({})
    const group = result.current.experimentGroup('AddressC2a')

    const { result: result2 } = renderWithMockedQuery({'exp:AddressC2a': 'FindOfficial'})
    expect(result2.current.experimentGroup('AddressC2a')).toEqual('FindOfficial')

    const { result: result3 } = renderWithMockedQuery({'exp:AddressC2a': 'RequestVBM'})
    expect(result3.current.experimentGroup('AddressC2a')).toEqual('RequestVBM')

    const { result: result4 } = renderWithMockedQuery({})
    expect(result4.current.experimentGroup('AddressC2a')).toEqual(group)
  })
})
