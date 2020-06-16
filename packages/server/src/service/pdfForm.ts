import { PDFDocument, StandardFonts, rgb, PDFPage, PDFPageDrawTextOptions } from 'pdf-lib'
import fs from 'fs'

const fillFormWrapper = async (
  filename: string,
  fillForm: (
    pages: PDFPage[],
    options: PDFPageDrawTextOptions
  ) => void,
): Promise<Buffer> => {
  const buffer = fs.readFileSync(filename)
  const doc = await PDFDocument.load(buffer)
  const options = {
    font: await doc.embedFont(StandardFonts.Helvetica),
    size: 12,
    color: rgb(0.96, 0.1, 0.1)
  }
  const pages = doc.getPages()
  fillForm(pages, options)
  return Buffer.from(await doc.save())
}

export const fillNewHampshire = () => fillFormWrapper(
  __dirname + '/forms/New_Hampshire.pdf',
  (pages, options) => {
    const { height } = pages[0].getSize()

    // Qualified Voter
    pages[0].drawText('X', {
      ...options,
      x: 86,
      y: height-100,
    })
    // Disabled
    pages[0].drawText('X', {
      ...options,
      x: 86,
      y: height-315,
    })
    // Primary Election
    pages[0].drawText('X', {
      ...options,
      x: 112,
      y: height-618,
    })
    // Democratic Party
    pages[0].drawText('X', {
      ...options,
      x: 229,
      y: height-635,
    })
    // Republican Party
    pages[0].drawText('X', {
      ...options,
      x: 348,
      y: height-635,
    })
    // General Election
    pages[0].drawText('X', {
      ...options,
      x: 112,
      y: height-665,
    })

    pages[1].drawText('George Washington', {
      ...options,
      x: 86,
      y: height-60,
    })
    pages[1].drawText('Mount Vernon', {
      ...options,
      x: 86,
      y: height-130,
    })
    pages[1].drawText('Same as above', {
      ...options,
      x: 86,
      y: height-210,
    })
    pages[1].drawText('123-456-7890', {
      ...options,
      x: 250,
      y: height-240,
    })
    pages[1].drawText('george.washington@gmail.com', {
      ...options,
      x: 250,
      y: height-300,
    })
    pages[1].drawText('01/01/2020', {
      ...options,
      x: 480,
      y: height-340,
    })
  }
)
