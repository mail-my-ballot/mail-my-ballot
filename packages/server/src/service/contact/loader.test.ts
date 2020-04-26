import { load } from './loader'
import { availableStates } from './type'
import { adapter } from './adapter'

test.only('Contact loader', async () => {
  const rawRecords = await load()
  availableStates.forEach(state => {
    expect(rawRecords[state].length).toBeGreaterThan(10)
  })
  
  const records = adapter(rawRecords)
  availableStates.forEach(state => {
    expect(Object.keys(records[state]).length).toBeGreaterThan(10)
  })
  // const foo = subAdapter('Florida', rawRecords['Florida'])
  // expect(Object.keys(foo).length).toBeGreaterThan(10)
})
