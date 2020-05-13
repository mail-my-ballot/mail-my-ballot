import { toPdfBuffer } from './pdf'
import fs from 'fs'

const main = async () => {
  const pdfBuffer = await toPdfBuffer(`<p>${'Lorem ipsum dolor sit amet, '.repeat(200)}</p>`)

  fs.writeFileSync('/tmp/test.pdf', pdfBuffer)
}

main()
