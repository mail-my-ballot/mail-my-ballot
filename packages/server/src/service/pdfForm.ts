import { PDFDocument, StandardFonts, rgb, PDFPage, PDFPageDrawTextOptions } from 'pdf-lib'
import fs from 'fs'

import { NewHampshireInfo } from '../common'
import { createPdfBuffer } from './pdf'

interface FillFormArg {
  doc: PDFDocument
  pages: PDFPage[]
  options: PDFPageDrawTextOptions
  check: (page: number, x: number, y: number) => void
  text: (text: string, page: number, x: number, y: number) => void
  placeImage: (imageBuffer: Uint8Array, page: number, x: number, y: number) => Promise<void>
}

export const toSignatureBuffer = async (dataUrl: string, maxWidth: number, maxHeight: number): Promise<Buffer> => {
  const html = '<style>@page{margin: 0mm;} body{margin: 0px;}</style>' +
    `<img src='${dataUrl}' style='max-width: ${maxWidth}; max-height: ${maxHeight}; padding: 0; margin: 0; border: 0 solid #fff;'/>`
  return createPdfBuffer(html, {width: (maxWidth) + 'px', height: (maxHeight) + 'px', border: '0px'})
}

/**
 * Need to make Uint8Array right away because buffer is reused
 * https://github.com/nodejs/node/issues/11132#issuecomment-277157700
 * */
const readBinaryFile = (filename: string): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      err ? reject(err) : resolve(new Uint8Array(data.buffer))
    })
  })
}

const fillFormWrapper = async (
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
  const text = (text: string, page: number, x: number, y: number) => {
    const { height } = pages[page].getSize()
    pages[page].drawText(text, {...options, x, y: height - y})
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

export const fillNewHampshire = (
  stateInfo: NewHampshireInfo
) => fillFormWrapper(
  __dirname + '/forms/New_Hampshire.pdf',
  async ({check, text, placeImage}) => {
    check(0, 86, 100) // Qualified Voter
    check(0, 86, 315) // Disabled
    if (stateInfo.primaryParty !== 'No Primary') {
      check(0, 112, 618) // Primary Election
      if (stateInfo.primaryParty === 'Democratic Party') {
        check(0, 229, 635) // Democratic Party
      } else if (stateInfo.primaryParty === 'Republican Party') {
        check(0, 348, 635) // Republican Party
      }
    }
    check(0, 112, 665) // General Election

    text(stateInfo.name, 1, 86, 60)
    text(stateInfo.uspsAddress, 1, 86, 130)
    // Sic: we want 'Same as above' even when stateInfo.mailingAddress === ''
    text(stateInfo.mailingAddress ? stateInfo.mailingAddress : 'Same as above', 1, 86, 210)
    text(stateInfo.phone, 1, 250, 240)
    text(stateInfo.email, 1, 250, 300)
    text(new Date().toISOString().split('T')[0], 1, 480, 340)

    const signatureBuffer = await toSignatureBuffer(stateInfo.signature, 200, 50)
    await placeImage(new Uint8Array(signatureBuffer.buffer), 1, 250, 360)
  }
)
