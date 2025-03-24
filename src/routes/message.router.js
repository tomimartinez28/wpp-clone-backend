import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { createMessageController } from '../controllers/message.controller.js'

const message_router = express.Router()

message_router.post('/create/:chat_id', authMiddleware, createMessageController)

export default message_router