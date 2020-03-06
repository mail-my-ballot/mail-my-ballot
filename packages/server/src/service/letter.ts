import { Router} from 'express'
import marked from 'marked'

import { firestoreService } from './firestore'
import { toEmail } from './states'


const router = Router()

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const info = await firestoreService.getRegistration(id)
  if (!info) {
    res.send('No valid registration entry')
    return
  }

  const mdEmailData = toEmail(info)

  if (!mdEmailData) {
    res.send('No email data supplied for this entry')
    return
  }

  const { md } = mdEmailData
  res.send(marked(md))
})

export default router
