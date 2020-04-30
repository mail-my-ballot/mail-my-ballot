import { loadStates } from './loader'
import { normalize } from './normalize'
import { availableStates } from '../../common'

test.only('Contact loader', async () => {
  const rawRecords = await loadStates()
  availableStates.forEach(state => {
    expect(rawRecords[state].length).toBeGreaterThan(10)
  })
  
  const records = normalize(rawRecords)
  availableStates.forEach(state => {
    expect(Object.keys(records[state]).length).toBeGreaterThan(10)
  })
  // const foo = subAdapter('Florida', rawRecords['Florida'])
  // expect(Object.keys(foo).length).toBeGreaterThan(10)
})
