import express from 'express'
import {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
} from '../../controllers/user.controller.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:userId', getOneUser)
router.post('/', createNewUser)
router.put('/:userId', updateOneUser)
router.delete('/:userId', deleteOneUser)

export default router
