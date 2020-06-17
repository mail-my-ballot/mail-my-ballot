import fs from 'fs'
import { fillNewHampshire } from './pdfForm'
import { stateInfo } from './letter/router'
import { NewHampshireInfo } from '../../../common/stateInfo'

const main = async () => {
  const data = await stateInfo('New Hampshire') as NewHampshireInfo
  const buffer = await fillNewHampshire({...data})
  fs.writeFileSync('/tmp/Foo.pdf', buffer)
}

main()
