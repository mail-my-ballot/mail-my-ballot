import { upload, getSignedUrl } from './storage'
import fs from 'fs'

const main = async () => {
  const buffer = fs.readFileSync('test.pdf')
  const result = await upload('test/test.pdf', buffer)
  console.log(result)
  const reuslt2 = await getSignedUrl('test/test.pdf')
  console.log(reuslt2)
}

main()
