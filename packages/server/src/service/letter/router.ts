import { Router, Response} from 'express'
import stripIndent from 'strip-indent'
import marked from 'marked'

import { FirestoreService } from '../firestore'
import { toEmailData } from '../email'
import { toContact } from '../contact'
import { toContactMethod, StateInfo, AvailableState, EmailMethod, availableStates, BaseInfo, GeorgiaInfo } from '../../common'
import fs from 'fs'
import { toLetter } from '.'


export const router = Router()

const firestoreService = new FirestoreService()

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

const sampleMethod: EmailMethod = {
  method: 'Email',
  emails: ['official@elections.gov'],
}

const renderLetter = (info: StateInfo, method: EmailMethod, confirmationId: string, res: Response, state?: string) => {
  const letter = toLetter(info, confirmationId)
  if (!letter) {
    return res.render('letter.pug', {
      letter: 'Unable to render letter',
      availableStates,
      state,
    })
  }
  const emailData = toEmailData(
    letter,
    info.email,
    method.emails,
    { forceEmailOfficials: true }
  )

  const { to, subject, html } = emailData
  const header = marked(stripIndent(`
  ## Header Information
  - To: ${(to).join(', ')}
  - Subject: ${subject}
  ----
  `))
  return res.render('letter.pug', {
    letter: header + html,
    availableStates,
    state,
  })
}

router.get('/sample/:state', async (req, res) => {
  const { state } = req.params

  const info = {
    ...sampleStateInfo,
    state: state as AvailableState,
  } as StateInfo // casting to state info is a bit of a hack
  const id = '#sampleId1234'

  return renderLetter(info, sampleMethod, id, res, state)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const info = await firestoreService.getRegistration(id)
  if (!info) {
    return res.send('No valid registration entry')
  }

  const contact = await toContact(info)
  if (!contact) {
    return res.send('No Contact Found')
  }

  const method = toContactMethod(info)
  if (!method || method.method != 'Email') {
    return res.send('No Contact Method Found')
  }

  return renderLetter(info,  method, id, res)
})
