import express from 'express'
import { authorization } from '../middleware/authorization'
import { loginAttempt } from '../controllers/admin'

const router = express.Router()


router.post('/loginAttempt', authorization, loginAttempt)



export default router