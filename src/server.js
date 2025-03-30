import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
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
const server = http.createServer(app) // Creo un servidor http con express
const io = new Server(server, {
    cors: { origin: ENVIRONMENT.FRONTEND_URL }
})

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

// Sockets
io.on("connection",  (socket) => {
    console.log("Usuario conectado:", socket.id);

    try {
        // Evento para recibir mensajes y enviarlo a todos los clientes conectados
        socket.on("sendMessage", async (message) => {
            console.log("Nuevo mensaje recibido:", message);
            // Creo el chat en la base de datos
            const created_message = await messageRepository.createMessage({
                sender: message.sender,
                content: message.content,
                chat_id: message.chat_id,
            })

            io.emit("receiveMessage", created_message); // Enviar el mensaje a todos los conectados
        });

          

    } catch (err) {
        console.log('Error en el web socket al crear un mensaje.');
    }


    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });
});

server.listen(ENVIRONMENT.PORT, () => {
    console.log(`Server is now running in http://localhost:${ENVIRONMENT.PORT}`);
})
