import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { createChatController, getUserChatsController } from '../controllers/chat.controller.js'


const chat_router = express.Router()

chat_router.post('/create', authMiddleware, createChatController)
chat_router.get('/get-user-chats', authMiddleware, getUserChatsController)


export default chat_router