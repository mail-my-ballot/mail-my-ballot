import { Router} from 'express'
import stripIndent from 'strip-indent'
import marked from 'marked'

import { FirestoreService } from './firestore'
import { toEmailData } from './email'
import { toContact } from './contact'
import { toContactMethod } from '../common'


const router = Router()

const firestoreService = new FirestoreService()

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const info = await firestoreService.getRegistration(id)
  if (!info) {
    return res.send('No valid registration entry')
  }

  const contact = toContact(info)
  if (!contact) {
    return res.send('No Contact Found')
  }
  const method = toContactMethod(contact)
  if (!method || method.method != 'email') {
    return res.send('No Contact Method Found')
  }

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
})

export default router
