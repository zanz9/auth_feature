const Router = require('express').Router
const router = Router()

router.use('/auth', require('./nested/auth'))

module.exports = router