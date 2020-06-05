import { storageFileFromId } from '../service/storage'
import minimist from 'minimist'

const main = async () => {
  const options = minimist(process.argv, {})
  if (!options.id) throw Error('Expected Id')
  const file = storageFileFromId(options.id)
  const url = await file.getSignedUrl(60 * 1000)
  console.log(url)
}

main()
