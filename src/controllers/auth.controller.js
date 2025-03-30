import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendMail } from "../utils/mailer.utils.js"
import userRepository from "../repository/auth.repository.js"
import ENVIRONMENT from "../config/env.config.js"
import { ServerError } from "../utils/errors.utils.js"
import { handleControllerError } from "../utils/errors.utils.js"





export const registerController = async (req, res) => {
    try {
        const { username, password, email } = req.body
        if (!username || !email || !password) throw new ServerError('All fields are required', 400)

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) throw new ServerError('Invalid email format', 400);

        // Validar contraseña segura
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password))
            throw new ServerError('Password must be at least 6 characters long, include a number and an uppercase letter', 400);

        // Hashear la pwd
        const hashed_password = await bcrypt.hash(password, 10)

        // creo un token
        const verification_token = jwt.sign(
            { email }, // lo que queremos guardar en token
            ENVIRONMENT.SECRET_KEY_JWT, // clave con la que vamos a firmar
            { expiresIn: '1h' } // tiempo de validez del token
        )

        // enviar correo con token
        await sendMail({
            to: email,
            html: `<h1>Validate your email </h1>
                    <p>This proccess help us tu make sure you are who you say you are</p>
                    <a href='${ENVIRONMENT.BACKEND_URL}/api/auth/verify-email?verification_token=${verification_token}'>verificar cuenta</a>
            `,
            subject: 'Validate your email'
        })

        await userRepository.create({
            username,
            email,
            password: hashed_password,
            verification_token
        })


        return res.status(201).send({
            message: "User registered successfully",
            status: 201,
            ok: true
        })




    } catch (err) {
        handleControllerError(res, err, 'An error ocurred when creating a user')
    }
}

export const verifyEmailController = async (req, res) => {
    try {
        const { verification_token } = req.query
        const payload = jwt.verify(verification_token, ENVIRONMENT.SECRET_KEY_JWT)
        const { email } = payload
        await userRepository.verifyUserByEmail(email)

        return res.redirect(ENVIRONMENT.FRONTEND_URL + '/')

    } catch (err) {
        return handleControllerError(res, err, 'An error ocurred when validating the user email')
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const found_user = await userRepository.findUserByEmail(email)
        if (!found_user) throw new ServerError('Email not found', 404)
        if (!found_user.verified) throw new ServerError('User email is not verified', 400)
        const is_same_password = await bcrypt.compare(password, found_user.password)
        if (!is_same_password) throw new ServerError('Incorrect password', 400)

        const authorization_token = jwt.sign(
            {
                _id: found_user._id,
                email: found_user.email,
                username: found_user.username
            },
            ENVIRONMENT.SECRET_KEY_JWT,
            {
                expiresIn: '2h'
            }
        )

        return res.json({
            ok: true,
            status: 200,
            message: 'Logged successfully',
            payload: {
                user: {
                    _id: found_user.id,
                    email: found_user.email,
                    username: found_user.username,
                    authorization_token,
                },
            }
        })



    } catch (err) {
        return handleControllerError(res, err, 'An error ocurred when login:')


    }

}


export const resetPasswordController = async (req, res) => {
    try {
        const { email } = req.body
        const found_user = await userRepository.findUserByEmail(email)
        if (!found_user) throw new ServerError('Email not found', 404)
        if (!found_user.verified) throw new ServerError('User email is not verified', 404)

        const reset_token = jwt.sign(
            {
                email,
                _id: found_user._id,

            },
            ENVIRONMENT.SECRET_KEY_JWT,
            {
                expiresIn: "1h"
            }
        )

        await sendMail({
            to: email,
            subject: 'Reset your password',
            html: `
                <h1>You request a password reset</h1>
                <a href='${ENVIRONMENT.FRONTEND_URL}/rewrite-password/?reset_token=${reset_token}'>Reset your password</a>
            `
        })

        return res.status(200).json({
            ok: true,
            status: 200,
            message: 'Reset mail sent'
        })

    } catch (err) {
        handleControllerError(res, err, "An error ocurred when reseting the password")
    }
}



export const rewritePasswordController = async (req, res) => {
    try {
        const { password, reset_token } = req.body
        const { _id } = jwt.verify(reset_token, ENVIRONMENT.SECRET_KEY_JWT)


        // Validar contraseña segura
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password))
            throw new ServerError('Password must be at least 6 characters long, include a number and an uppercase letter', 400);

        // hasheo la nueva contraseña

        const hashed_password = await bcrypt.hash(password, 10)

        await userRepository.changeUserPassword(_id, hashed_password)

        return res.status(200).send({
            ok: true,
            message: 'Password successfully reset',
            status: 200,
        })



    } catch (err) {
        handleControllerError(res, err, "Error when rewriting the new password.")
    }
}


export const verifyJwtController = async (req, res) => {
    try {
        const user = req.user
        res.status(200).send({
            ok: true,
            message: 'JWT is correct',
            status: 200,
            payload: {
                user
            }
        })
    } catch (err) {
        handleControllerError(res, err, "error while checking de jwt")
    }
}
export const getAllUsersController = async (req, res) => {
    try {
        const user_id = req.user._id

        const usersList = await userRepository.getAllUsers(user_id)
        return res.status(200).send({
            ok: true,
            message: 'User list got successfully',
            status: 200,
            payload: {
                usersList
            }
        })

    } catch (err) {
        handleControllerError(res, err, "Error while getting de users list")
    }
}


export const getUserById = async (req, res) => {
    try {
        const { user_id } = req.params
        const foundUser = await userRepository.findUserById(user_id)
        return res.status(200).send({
            ok: true,
            message: 'User found successfully',
            status: 200,
            payload: {
                foundUser
            }
        })
    } catch (err) {
        handleControllerError(res, err, "Error while getting the user")
    }
}

export const updateUserAvatarController = async (req, res) => {
    try {

        if(!req.file) throw new ServerError('No file uploaded', 400)
        const user_id = req.user._id
        const avatarPath = `/avatars/${req.file.filename}`

        await userRepository.updateUserAvatar(user_id, avatarPath)
        return res.status(200).send({
            ok: true,
            status: 200,
            message: "Avatar successfully updated"
        })

    } catch (err) {
        handleControllerError(res, err, "Error while updating the user")
    }
}

/* export const getUsersController = async (req, res) => {
    try {
        const user = req.user
        res.status(201).send({
            ok: true,
            message: 'User got successfully',
            status: 200,
            payload: {
                user
            }
        })
    } catch (err) {
        handleControllerError(res, err, 'Error while getting the user')
    }
} */



