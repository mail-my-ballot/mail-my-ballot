import { StorageFile } from './storage'
import fs from 'fs'

const main = async () => {
  const buffer = fs.readFileSync('test.pdf')
  const file = new StorageFile('test/test.pdf')
  const result = await file.upload(buffer)
  console.log(result)
  const reuslt2 = await file.getSignedUrl(24 * 60 * 60 * 1000)
  console.log(reuslt2)

}

main()
