import fs from 'fs'
import csv from 'csv-parser' 

interface Line {
  zip: string
  state_id: string
  state_name: string
}

const lines: Line[] = []
interface StateValue {
  stateId: string
  stateName: string
}
let obj: Record<string, StateValue> | null = null

fs.createReadStream(__dirname + '/uszips.csv')
  .pipe(csv())
  .on('data', (data: Line) => lines.push(data))
  .on('end', () => {
    obj = Object.fromEntries(
      lines.map(
        (obj) => [
          obj.zip.padStart(5, '0'),
          {
            stateId: obj.state_id,
            stateName: obj.state_name
          }
        ]
      )
    )
  })

export const search = (zip: string): string | null => {
  if (!obj) return null
  const {stateName} = obj[zip]
  if (!stateName) return null
  return stateName
}
