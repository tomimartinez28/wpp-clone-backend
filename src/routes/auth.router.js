import express from 'express'
import { registerController, verifyEmailController, loginController, resetPasswordController, rewritePasswordController, verifyJwtController, getAllUsersController, getUserById } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const auth_router = express.Router()

auth_router.post('/register', registerController)
auth_router.get('/verify-email', verifyEmailController)
auth_router.post('/login', loginController)
auth_router.post('/reset-password', resetPasswordController)
auth_router.post('/rewrite-password', rewritePasswordController)
auth_router.get('/verify-jwt', authMiddleware, verifyJwtController)
auth_router.get('/get-all-users', authMiddleware, getAllUsersController)

auth_router.get('/get-user/:user_id', authMiddleware, getUserById)


/* auth_router.get('/get-user', authMiddleware, getUserController) */



export default auth_router