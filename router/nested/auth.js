const {Router} = require("express");
const {body} = require("express-validator");

const AuthController = require("../../packages/auth/controller/AuthController");

const router = Router()
router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
    AuthController.register)
router.post('/login',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
    AuthController.login)
router.get('/logout', AuthController.logout)
router.get('/refresh', AuthController.refresh)

module.exports = router