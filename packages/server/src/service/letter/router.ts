import { Router} from 'express'

import { getContact, getFirstContact, getContactRecords } from '../contact'
import { toContactMethod, StateInfo, ImplementedState, implementedStates, BaseInfo, ContactMethod, isImplementedState } from '../../common'
import fs from 'fs'
import { toLetter } from '.'


export const router = Router()

const loadBase64 = (filename: string) => {
  return fs.readFileSync(__dirname + '/' + filename).toString('base64')
}

const baseStateInfo: Omit<BaseInfo, 'contact'> = {
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

const signature = 'data:image/png;base64,' + loadBase64('signature.png')
const idPhoto = 'data:image/jpg;base64,' + loadBase64('idPhoto.jpg')

export const stateInfo = async (state: ImplementedState): Promise<StateInfo> => {
  const commonStateInfo = {
    ...baseStateInfo,
    contact: await getFirstContact(state)
  }
  
  switch(state) {
    case 'Wisconsin': return {
      ...commonStateInfo,
      idPhoto,
      state,
    }
    case 'Nevada': return {
      ...commonStateInfo,
      signature,
      idPhoto,
      state,
    }

    case 'Arizona': return {
      ...commonStateInfo,
      idType: 'Arizona License Number',
      idData: '1234',
      party: 'Non-Partisan',
      state,
    }
    default: return {
      ...commonStateInfo,
      signature,
      state,
    }
  }
}

export const sampleMethod: ContactMethod = {
  stateMethod: 'fax-email',
  emails: ['official@elections.gov'],
  faxes: [],
}

router.get('/:state/:key?', async (req, res) => {
  const { state, key } = req.params

  if (!isImplementedState(state)) return res.redirect('/letter/Florida/')
  const contact = await (key ? getContact(state, key) : getFirstContact(state))
  if (!contact) return res.redirect(`/${state}`)

  const method = toContactMethod({...contact, state})
  const contactRecords = await getContactRecords()
  const keys = Object.keys(contactRecords[state])

  // generate sample info
  const info = await stateInfo(state)
  const confirmationId = '#sampleId1234'

  const renderLetter = (letter: string) => {
    return res.render('letter.pug', {
      letter,

      // state data
      implementedStates: [...implementedStates].sort(),
      state,

      // locale data
      keys,
      key,
    })
  }

  if (!method) return renderLetter('Could not find contact method for elections official')

  const letter = toLetter(info, method, confirmationId)
  return renderLetter(letter.html)
})
