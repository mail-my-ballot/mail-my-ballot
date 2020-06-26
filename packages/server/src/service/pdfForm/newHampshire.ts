import { NewHampshireInfo } from '../../common'
import { fillFormWrapper } from '.'
import { toSignatureBuffer } from './util'

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

    const signatureBuffer = await toSignatureBuffer(stateInfo.signature, 150, 30)
    await placeImage(new Uint8Array(signatureBuffer.buffer), 1, 220, 352)
  }
)