import { load, availableStates } from './loader'

test.only('Contact loader', async () => {
  const data = await load()

  availableStates.forEach(state => {
    expect(data[state].length).toBeGreaterThan(10)
  })
})
