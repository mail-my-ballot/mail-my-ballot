import fs from 'fs'
import { fillNewHampshire } from './pdfForm'

const main = async () => {
  const buffer = await fillNewHampshire()
  fs.writeFileSync('/tmp/Foo.pdf', buffer)
}

main()
