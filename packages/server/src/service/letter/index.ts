import { Router, Response} from 'express'
import stripIndent from 'strip-indent'
import marked from 'marked'

import { FirestoreService } from '../firestore'
import { toEmailData } from '../email'
import { toContact } from '../contact'
import { toContactMethod, StateInfo, AvailableState, EmailMethod } from '../../common'
import fs from 'fs'


const router = Router()

const firestoreService = new FirestoreService()

const signaturePng = fs.readFileSync(__dirname + '/signature.png')

const sampleStateInfo: StateInfo = {
  state: 'Florida',
  name: 'George Washington',
  email: 'george.washington@gmail.com',
  phone: '+1 (234)-567-8901',
  birthdate: '04-01-1756',
  uspsAddress: 'Mount Vernon',
  county: 'Fairfax',
  city: 'Fairfax',
  signature: 'data:image/png;base64,' + signaturePng.toString('base64'),
  oid: 'default',
  ip: '128.0.0.1',
  userAgent: 'Firefox',
}

const sampleMethod: EmailMethod = {
  method: 'email',
  emails: ['official@elections.gov'],
}

const renderLetter = (info: StateInfo, method: EmailMethod, id: string, res: Response) => {

  const emailData = toEmailData(info, id, method.emails, { forceEmailOfficials: true})

  if (!emailData) {
    return res.send('No email data supplied for this entry')
  }

  const { to, subject, md } = emailData
  const header = stripIndent(`
  ## Header Information
  - To: ${(to).join(', ')}
  - Subject: ${subject}
  ----
  `)
  return res.send(marked(header + md))
}

router.get('/sample/:state', async (req, res) => {
  const { state } = req.params

  const info = {
    ...sampleStateInfo,
    state: state as AvailableState,
  } as StateInfo // casting to state info is a bit of a hack
  const id = '#sampleId1234'

  return renderLetter(info, sampleMethod, id, res)
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
  if (!method || method.method != 'email') {
    return res.send('No Contact Method Found')
  }

  return renderLetter(info,  method, id, res)
})


export default router
