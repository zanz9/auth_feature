import {Router} from 'express'

const router = Router()

router.use('/auth', require('./nested/auth'))

export default router