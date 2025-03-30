import express from 'express'
import cors from "cors"
import ENVIRONMENT from './config/env.config.js'
import mongoose from "./config/mongodb.config.js";
import auth_router from './routes/auth.router.js';
import chat_router from './routes/chat.router.js';
import message_router from './routes/message.router.js';
import messageRepository from './repository/message.repository.js'
import path from 'path'
import { fileURLToPath } from 'url'


const app = express()


// Middlewares
app.use(cors({
    origin: ENVIRONMENT.FRONTEND_URL
}))
app.use(express.json())

// Acá está la magia: le decís a Express que sirva los archivos estáticos de la carpeta public
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')))


// Rutas
app.use('/api/auth', auth_router)
app.use('/api/chat', chat_router)
app.use('/api/message', message_router)



app.listen(ENVIRONMENT.PORT, () => {
    console.log(`Server is now running in http://localhost:${ENVIRONMENT.PORT}`);
})
