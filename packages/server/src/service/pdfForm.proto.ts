import fs from 'fs'
import { fillNorthCarolina, toSignatureBuffer } from './pdfForm'
import { stateInfo } from './letter/router'
import { NorthCarolinaInfo } from '../../../common/stateInfo'


const main = async () => {
  const data = await stateInfo('North Carolina') as NorthCarolinaInfo
  const buffer = await fillNorthCarolina({...data})
  fs.writeFileSync('/tmp/Foo.pdf', buffer)
  const signatureBuffer = await toSignatureBuffer(data.signature, 200, 50)
  fs.writeFileSync('/tmp/Bar.pdf', signatureBuffer)
}

main()
