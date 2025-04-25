import express from 'express'
import { authorization } from '../middleware/authorization'
import {changePassword, loginAttempt, updateProfileInfo} from '../controllers/admin'

const router = express.Router()


router.post('/loginAttempt', authorization, loginAttempt)

router.put('/changePassword',authorization, changePassword)

router.put('/updateProfileInfo',authorization, updateProfileInfo)



export default router