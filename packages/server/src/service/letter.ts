import { Router} from 'express'
import stripIndent from 'strip-indent'
import marked from 'marked'

import { FirestoreService } from './firestore'
import { toEmailData } from './email'


const router = Router()

const firestoreService = new FirestoreService()

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const info = await firestoreService.getRegistration(id)
  if (!info) {
    res.send('No valid registration entry')
    return
  }

  const emailData = toEmailData(info, { mockProduction: true})

  if (!emailData) {
    res.send('No email data supplied for this entry')
    return
  }

  const { to, subject, md } = emailData
  const header = stripIndent(`
  ## Header Information
  - To: ${(to).join(', ')}
  - Subject: ${subject}
  ----
  `)
  res.send(marked(header + md))
})

export default router
