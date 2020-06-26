import { NorthCarolinaInfo } from '../../common'
import { fillFormWrapper  } from '.'
import { splitFullName, toSignatureBuffer } from './util'

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

    const birthdateSplit = stateInfo.birthdate.split('/')
    // Month
    text(birthdateSplit[0], 2, 481, 90)
    // Day
    text(birthdateSplit[1], 2, 508, 90)
    // Year
    text(birthdateSplit[2], 2, 542, 90)

    if (stateInfo.idType == 'North Carolina License Number') {
      text(stateInfo.idData, 2, 370, 134)
    } else {  // stateInfo.idType == 'Last 4 numbers of SSN'
      text(stateInfo.idData[0], 2, 497, 134)
      text(stateInfo.idData[1], 2, 520, 134)
      text(stateInfo.idData[2], 2, 543, 134)
      text(stateInfo.idData[3], 2, 566, 134)
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
      const dateMovedSplit = stateInfo.dateMoved.split('/')
      // Month
      text(dateMovedSplit[0], 2, 311, 198)
      // Day
      text(dateMovedSplit[1], 2, 338, 198)
      // Year
      text(dateMovedSplit[2], 2, 362, 198)
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

    const signatureBuffer = await toSignatureBuffer(stateInfo.signature, 120, 30)
    await placeImage(new Uint8Array(signatureBuffer.buffer), 2, 84, 755)
  }
)