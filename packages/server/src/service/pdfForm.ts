import { PDFDocument, StandardFonts, rgb, PDFPage, PDFPageDrawTextOptions } from 'pdf-lib'
import fs from 'fs'

import { NewHampshireInfo } from '../common'
import { NorthCarolinaInfo } from '../common'
import { createPdfBuffer } from './pdf'

interface FillFormArg {
  doc: PDFDocument
  pages: PDFPage[]
  options: PDFPageDrawTextOptions
  check: (page: number, x: number, y: number) => void
  text: (text: string, page: number, x: number, y: number, size?: number) => void
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

// Return [first name, middle name, last name, suffix].
function splitFullName(fullName: string) {
  const nameSplit = fullName.split(' ')
  let firstName = ''
  let lastName = ''
  let middleName = ''
  let suffix = ''
  firstName = nameSplit[0]
  if(nameSplit.length == 2) {
    lastName = nameSplit[1]     
  } else if(nameSplit.length == 3) {
    if(nameSplit[2].length < 4 
        && (nameSplit[2].toLowerCase().includes('jr')
        || nameSplit[2].toLowerCase().includes('sr'))) {
          lastName = nameSplit[1]
          suffix = nameSplit[2]
        } else {
          lastName = nameSplit[2]
          middleName = nameSplit[1]
        }
  } else if(nameSplit.length == 4) {
    middleName = nameSplit[1]
    lastName = nameSplit[2]
    suffix = nameSplit[3]
  } else {
    throw new Error('Cannot handle this name.')
  }
  return [firstName, middleName, lastName, suffix]
}

export const fillNorthCarolina = (
  stateInfo: NorthCarolinaInfo
) => fillFormWrapper(
  __dirname + '/forms/North_Carolina.pdf',
  async ({check, text, placeImage}) => {
    const nameSplit = splitFullName(stateInfo.name)
    text(nameSplit[2], 2, 56, 90)
    text(nameSplit[0], 2, 226, 90)
    text(nameSplit[1], 2, 355, 90)
    text(nameSplit[3], 2, 440, 90)

    const birthdateSplit = stateInfo.birthdate.split('-')
    // Month
    text(birthdateSplit[1], 2, 481, 90)
    // Day
    text(birthdateSplit[2], 2, 508, 90)
    // Year
    text(birthdateSplit[0], 2, 542, 90)

    switch(stateInfo.idType) {
      case 'North Carolina License Number':
        text(stateInfo.idData, 2, 370, 134)
        break
      case 'Last 4 numbers of SSN':
        text(stateInfo.idData[0], 2, 497, 134)
        text(stateInfo.idData[1], 2, 520, 134)
        text(stateInfo.idData[2], 2, 543, 134)
        text(stateInfo.idData[3], 2, 566, 134)
        break
      default:
        throw new Error('Invalid North Carolina idType.')
    }

    const streetAddress = ((stateInfo.address.streetNumber ? stateInfo.address.streetNumber : '')
                           + ' ' + (stateInfo.address.street ? stateInfo.address.street : '')
                           + ' ' + (stateInfo.address.unit ? stateInfo.address.unit : ''))
    text(streetAddress, 2, 60, 175)
    text(stateInfo.address.city ? stateInfo.address.city : '', 2, 55, 207)
    text(stateInfo.address.stateAbbr ? stateInfo.address.stateAbbr : '', 2, 134, 207, 9)
    text(stateInfo.address.postcode ? stateInfo.address.postcode : '', 2, 158, 207, 9)

    if(stateInfo.dateMoved) {
      check(2, 396, 170)
      const dateMovedSplit = stateInfo.dateMoved.split('-')
      // Month
      text(dateMovedSplit[1], 2, 311, 198)
      // Day
      text(dateMovedSplit[2], 2, 338, 198)
      // Year
      text(dateMovedSplit[0], 2, 362, 198)
    } else {
      check(2, 375, 170)
    }

    // Get county data from contact.
    text(stateInfo.contact.county ? stateInfo.contact.county.split(' ')[0] : '', 2, 200, 207)

    check(2, 498, 272) // General election

    // Sic: we want 'Same as above' even when stateInfo.mailingAddress === ''
    if(!stateInfo.mailingAddress) {
      text('Same as above', 2, 56, 300)
    } else {
      text(stateInfo.mailingAddress, 2, 56, 300, 9)
    }

    text(stateInfo.phone, 2, 420, 240)
    text(stateInfo.email, 2, 100, 240)
    text(new Date().toISOString().split('T')[0], 2, 230, 745)

    const signatureBuffer = await toSignatureBuffer(stateInfo.signature, 200, 50)
    await placeImage(new Uint8Array(signatureBuffer.buffer), 2, 76, 760)
  }
)
