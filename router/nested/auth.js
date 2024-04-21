import {Router} from "express";
import {body} from "express-validator";
import AuthController from "../../packages/auth/controller/AuthController.js";

const authRouter = Router()
authRouter.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
    AuthController.register)
authRouter.post('/login',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
    AuthController.login)
authRouter.get('/logout', AuthController.logout)
authRouter.get('/refresh', AuthController.refresh)

export default authRouter