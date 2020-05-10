import { Router} from 'express'

import { getContactRecords } from '../contact'
import { toContactMethod, StateInfo, AvailableState, availableStates, BaseInfo, GeorgiaInfo, ContactMethod, isAvailableState } from '../../common'
import fs from 'fs'
import { toLetter } from '.'


export const router = Router()

const signaturePng = fs.readFileSync(__dirname + '/signature.png')

const baseStateInfo: BaseInfo = {
  state: 'Florida',
  name: 'George Washington',
  email: 'george.washington@gmail.com',
  phone: '+1 (234)-567-8901',
  birthdate: '04-01-1756',
  uspsAddress: 'Mount Vernon',
  county: 'Fairfax',
  city: 'Fairfax',
  oid: 'default',
}

export const signatureStateInfo: BaseInfo & {signature: string} = {
  ...baseStateInfo,
  signature: 'data:image/png;base64,' + signaturePng.toString('base64'),
}

const sampleStateInfo: GeorgiaInfo = {
  ...signatureStateInfo,
  ip: '128.0.0.1',
  userAgent: 'Firefox',
  party: 'Non-Partisan',
  state: 'Georgia',
}

export const sampleMethod: ContactMethod = {
  stateMethod: 'fax-email',
  emails: ['official@elections.gov'],
  faxes: [],
}

router.get('/sample/:stateIndex', async (req, res) => {
  const { stateIndex } = req.params
  const [state, rawIndex] = stateIndex.split('-')

  if (!isAvailableState(state)) return res.redirect('/sample/Florida-0')
  const index = parseInt(rawIndex)
  if (isNaN(index)) return res.redirect(`/sample/${state}-0`)

  // get contact method
  const contactRecords = await getContactRecords()
  const stateContacts = Object.keys(contactRecords[state])
  const key = stateContacts[index]
  const contact = contactRecords[state][key]  
  const method = toContactMethod({...contact, state})

  // generate sample info
  const info = {
    ...sampleStateInfo,
    state: state as AvailableState,
  } as StateInfo // casting to state info is a bit of a hack
  const confirmationId = '#sampleId1234'

  const renderLetter = (letter: string) => {
    return res.render('letter.pug', {
      letter,

      // state data
      availableStates,
      state,

      // locale data
      stateContacts,
      index,
    })
  }

  if (!method) return renderLetter('Could not find contact method for elections official')

  const letter = toLetter(info, method, confirmationId)
  return renderLetter(letter.html)
})
