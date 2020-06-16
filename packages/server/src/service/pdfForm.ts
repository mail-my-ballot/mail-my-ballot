import { PDFDocument, StandardFonts, rgb, PDFPage, PDFPageDrawTextOptions } from 'pdf-lib'
import fs from 'fs'

interface FillFormArg {
  pages: PDFPage[]
  options: PDFPageDrawTextOptions
  check: (page: number, x: number, y: number) => void
  text: (page: number, text: string, x: number, y: number) => void
}

const fillFormWrapper = async (
  filename: string,
  fillForm: (arg: FillFormArg) => void,
): Promise<Buffer> => {
  const buffer = fs.readFileSync(filename)
  const doc = await PDFDocument.load(buffer)
  const options = {
    font: await doc.embedFont(StandardFonts.Helvetica),
    size: 12,
    color: rgb(0.96, 0.1, 0.1)
  }
  const pages = doc.getPages()
  const text = (page: number, text: string, x: number, y: number) => {
    const { height } = pages[page].getSize()
    pages[page].drawText(text, {...options, x, y: height - y})
  }
  fillForm({
    pages,
    options,
    text,
    check: (page, x, y) => text(page, 'X', x, y),
  })
  return Buffer.from(await doc.save())
}

export const fillNewHampshire = () => fillFormWrapper(
  __dirname + '/forms/New_Hampshire.pdf',
  ({check, text}) => {
    check(0, 86, 100) // Qualified Voter
    check(0, 86, 315) // Disabled
    check(0, 112, 618) // Primary Election
    check(0, 229, 635) // Democratic Party
    check(0, 348, 635) // Republican Party
    check(0, 112, 665) // General Election

    text(1, 'George Washington', 86, 60)
    text(1, 'Mount Vernon', 86, 130)
    text(1, 'Same as above', 86, 210)
    text(1, '123-456-7890', 250, 240)
    text(1, 'george.washington@gmail.com', 250, 300) // 'Same as above'
    text(1, '01/01/2020', 480, 340) // 'Same as above'
  }
)
