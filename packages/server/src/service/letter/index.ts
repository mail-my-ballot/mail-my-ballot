import { Router} from 'express'

import { firestoreService } from '../firestore'
import { letter } from './letter'

const router = Router()

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const info = await firestoreService.getRegistration(id)
  res.send(letter(info))
})

export default router
