import express from 'express'
import { registerController, verifyEmailController, loginController, resetPasswordController, rewritePasswordController, verifyJwtController, getAllUsersController, getUserById, updateUserAvatarController } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import multer from 'multer'
import path from 'path'
// Manejar el upload de imagenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, 'src/public/avatars')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage,
})

/* ========================================== */





const auth_router = express.Router()

auth_router.post('/register', registerController)
auth_router.get('/verify-email', verifyEmailController)
auth_router.post('/login', loginController)
auth_router.post('/reset-password', resetPasswordController)
auth_router.post('/rewrite-password', rewritePasswordController)
auth_router.get('/verify-jwt', authMiddleware, verifyJwtController)
auth_router.get('/get-all-users', authMiddleware, getAllUsersController)

auth_router.get('/get-user/:user_id', authMiddleware, getUserById)

auth_router.put('/update-user-avatar',authMiddleware, upload.single('file'), updateUserAvatarController)



/* auth_router.get('/get-user', authMiddleware, getUserController) */



export default auth_router