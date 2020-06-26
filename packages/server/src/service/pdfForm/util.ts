import { createPdfBuffer } from '../pdf'

// Return [first name, middle name, last name, suffix].
export const splitFullName = (fullName: string) => {
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

export const toSignatureBuffer = async (dataUrl: string, maxWidth: number, maxHeight: number): Promise<Buffer> => {
  const html = '<style>@page{margin: 0mm;} body{margin: 0px;}</style>' +
    `<img src='${dataUrl}' style='max-width: ${maxWidth}; max-height: ${maxHeight}; padding: 0; margin: 0; border: 0 solid #fff;'/>`
  return createPdfBuffer(html, {width: (maxWidth) + 'px', height: (maxHeight) + 'px', border: '0px'})
}