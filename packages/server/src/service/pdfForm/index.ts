import { PDFDocument, StandardFonts, rgb, PDFPage, PDFPageDrawTextOptions } from 'pdf-lib'
import fs from 'fs'

export { fillMinnesota } from './minnesota'
export { fillNorthCarolina } from './northCarolina'
export { fillNewHampshire } from './newHampshire'


interface FillFormArg {
  doc: PDFDocument
  pages: PDFPage[]
  options: PDFPageDrawTextOptions
  check: (page: number, x: number, y: number) => void
  text: (text: string, page: number, x: number, y: number, size?: number) => void
  placeImage: (imageBuffer: Uint8Array, page: number, x: number, y: number) => Promise<void>
}

/**
 * Need to make Uint8Array right away because buffer is reused
 * https://github.com/nodejs/node/issues/11132#issuecomment-277157700
 * */
export const readBinaryFile = (filename: string): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      err ? reject(err) : resolve(new Uint8Array(data.buffer))
    })
  })
}

export const fillFormWrapper = async (
  filename: string,
  fillForm: (arg: FillFormArg) => Promise<void>,
): Promise<Buffer> => {
  const byteArray = await readBinaryFile(filename)
  const doc = await PDFDocument.load(byteArray)
  const options = {
    font: await doc.embedFont(StandardFonts.Helvetica),
    size: 12,
    color: rgb(0.96, 0.1, 0.1)
  }
  const pages = doc.getPages()
  const text = (text: string, page: number, x: number, y: number, size?: number) => {
    const { height } = pages[page].getSize()
    if(!size) {
      size = options.size
    }
    pages[page].drawText(text, {...options, x, y: height - y, size: size})
  }
  const placeImage = async (imageBuffer: Uint8Array, page: number, x: number, y: number): Promise<void> => {
    const { height } = pages[page].getSize()
    const [image] = await doc.embedPdf(imageBuffer)
    pages[page].drawPage(image, {
      ...image.scale(1.0),
      x,
      y: height - y,
    })
  }

  await fillForm({
    doc,
    pages,
    options,
    text,
    check: (page, x, y) => text('X', page, x, y),
    placeImage,
  })
  return Buffer.from(await doc.save())
}
