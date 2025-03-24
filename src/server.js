import express from 'express'
import cors from "cors"
import ENVIRONMENT from './config/env.config.js'
import mongoose from "./config/mongodb.config.js";
import auth_router from './routes/auth.router.js';
import chat_router from './routes/chat.router.js';
import message_router from './routes/message.router.js';

const app = express()

// Reservado para ciertos dominios
app.use(cors({
    origin:ENVIRONMENT.FRONTEND_URL
})) 


app.use(express.json())

app.use('/api/auth', auth_router)
app.use('/api/chat', chat_router)
app.use('/api/message', message_router)

app.listen(ENVIRONMENT.PORT, () => {
    console.log(`Server is now running in http://localhost:${ENVIRONMENT.PORT}`);
})
