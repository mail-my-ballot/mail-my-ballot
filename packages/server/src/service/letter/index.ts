import { Router} from 'express'

import { firestoreService } from '../firestore'

const router = Router()

router.get('/:id', async (req, res) => {
  const id = req.params.id
  res.send(await firestoreService.getRegistration(id))
})

export default router
