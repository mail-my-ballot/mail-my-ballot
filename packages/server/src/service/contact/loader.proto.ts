import { loadState } from './loader'
import { subAdapter } from './adapter'

const main = async () => {
  const rawRecord = await loadState('Florida')
  console.log(rawRecord[1][4])
  const record = subAdapter(...rawRecord)
  console.log(Object.keys(record)[3])
  console.log(Object.values(record)[3])
  return record
}

if (module === require.main) {
  main()
}