import { getContactRecords, getMichiganRecords } from './loader'
import { availableStates } from '../../common'
import { testRoutine } from '../utilTests'

describe('Contact loader', () => {
  test.each(availableStates)(
    `Non-trivial normalized records for %i`,
    async state => {
      const records = await getContactRecords()
      expect(Object.keys(records[state]).length).toBeGreaterThan(10)
    }
  )

  testRoutine('Michigan Fipsrecords work', async () => {
    const michiganRecords = await getMichiganRecords()
    expect(Object.keys(michiganRecords).length).toBeGreaterThan(10)
  })
})
