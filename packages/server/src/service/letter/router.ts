import { Router} from 'express'

import { getContactRecords } from '../contact'
import { toContactMethod, StateInfo, ImplementedState, implementedStates, BaseInfo, GeorgiaInfo, ContactMethod, isImplementedState } from '../../common'
import fs from 'fs'
import { toLetter } from '.'


export const router = Router()

const loadBase64 = (filename: string) => {
  return fs.readFileSync(__dirname + '/' + filename).toString('base64')
}

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
  signature: 'data:image/png;base64,' + loadBase64('signature.png'),
  idPhoto: 'data:image/jpg;base64,' + loadBase64('idPhoto.jpg'),
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

router.get('/:stateIndex', async (req, res) => {
  const { stateIndex } = req.params
  const [state, rawIndex] = stateIndex.split('-')

  if (!isImplementedState(state)) return res.redirect('/sample/Florida-0')
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
    state: state as ImplementedState,
  } as StateInfo // casting to state info is a bit of a hack
  const confirmationId = '#sampleId1234'

  const renderLetter = (letter: string) => {
    return res.render('letter.pug', {
      letter,

      // state data
      implementedStates: [...implementedStates].sort(),
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
