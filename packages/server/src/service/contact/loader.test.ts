import { loadStates } from './loader'
import { normalizeRecords } from './normalize'
import { availableStates } from '../../common'
import { RawContactRecord, ContactRecord } from './type'

describe('Contact loader', () => {
  let rawRecords: RawContactRecord
  let records: ContactRecord
  beforeAll(async () => {
    rawRecords = await loadStates()
    records = normalizeRecords(rawRecords)
  })

  test.each(availableStates)(
    `Non-trivial raw records for %i`,
    (state) => expect(rawRecords[state].length).toBeGreaterThan(10)
  )
  
  test.each(availableStates)(
    `Non-trivial normalized records for %i`,
    state => expect(Object.keys(records[state]).length).toBeGreaterThan(10)
  )
})
