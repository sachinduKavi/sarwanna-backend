import express from 'express'
import { authorization } from '../middleware/authorization'
import {changePassword, getCurrentPassword, loginAttempt} from '../controllers/admin'

const router = express.Router()


router.post('/loginAttempt', authorization, loginAttempt)

router.put('/changePassword',authorization, changePassword)

router.post('/getCurrentPassword',authorization, getCurrentPassword)


export default router