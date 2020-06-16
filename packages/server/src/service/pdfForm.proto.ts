import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import fs from 'fs'

const main = async () => {
  const buffer = fs.readFileSync(__dirname + '/forms/New_Hampshire.pdf')
  const doc = await PDFDocument.load(buffer)
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const pages = doc.getPages()
  const { width, height } = pages[0].getSize()
  pages[0].drawText('Sample Text', {
    x: width / 2,
    y: height / 2,
    font,
    color: rgb(0.95, 0.1, 0.1),
  })
  const bytes = await doc.save()
  fs.writeFileSync('/tmp/Foo.pdf', new Buffer(bytes))
}

main()
