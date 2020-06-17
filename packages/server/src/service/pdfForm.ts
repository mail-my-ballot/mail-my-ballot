import { PDFDocument, StandardFonts, rgb, PDFPage, PDFPageDrawTextOptions } from 'pdf-lib'
import fs from 'fs'

import { NewHampshireInfo } from '../common'
import { createPdfBuffer } from './pdf'

interface FillFormArg {
  doc: PDFDocument
  pages: PDFPage[]
  options: PDFPageDrawTextOptions
  check: (page: number, x: number, y: number) => void
  text: (page: number, text: string, x: number, y: number) => void
  placeImage: (page: number, imageBuffer: Buffer, x: number, y: number) => Promise<void>
}

export const toSignatureBuffer = async (dataUrl: string, maxWidth: number, maxHeight: number): Promise<Buffer> => {
  const html = '<style>@page{margin: 0mm;} body{margin: 0px;}</style>' +
    `<img src='${dataUrl}' style='max-width: ${maxWidth}; max-height: ${maxHeight}; padding: 0; margin: 0; border: 0 solid #fff;'/>`
  return createPdfBuffer(html, {width: (maxWidth) + 'px', height: (maxHeight) + 'px', border: '0px'})
}

const fillFormWrapper = async (
  filename: string,
  fillForm: (arg: FillFormArg) => Promise<void>,
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
  const placeImage = async (page: number, imageBuffer: Buffer, x: number, y: number): Promise<void> => {
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
    check: (page, x, y) => text(page, 'X', x, y),
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

    text(1, stateInfo.name, 86, 60)
    text(1, stateInfo.uspsAddress, 86, 130)
    text(1, stateInfo.mailingAddress ?? 'Same as above', 86, 210)
    text(1, stateInfo.phone, 250, 240)
    text(1, stateInfo.email, 250, 300)
    text(1, new Date().toISOString().split('T')[0], 480, 340)

    const signatureBuffer = await toSignatureBuffer(stateInfo.signature, 200, 50)
    await placeImage(1, signatureBuffer, 250, 360)
  }
)
