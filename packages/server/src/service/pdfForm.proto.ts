import fs from 'fs'
import { fillNewHampshire, toSignatureBuffer } from './pdfForm'
import { stateInfo } from './letter/router'
import { NewHampshireInfo } from '../../../common/stateInfo'

const main = async () => {
  const data = await stateInfo('New Hampshire') as NewHampshireInfo
  const buffer = await fillNewHampshire({...data})
  fs.writeFileSync('/tmp/Foo.pdf', buffer)
  const signatureBuffer = await toSignatureBuffer(data.signature, 200, 50)
  fs.writeFileSync('/tmp/Bar.pdf', signatureBuffer)
}

main()
