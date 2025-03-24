import { handleControllerError } from "../utils/errors.utils.js"
import messageRepository from "../repository/message.repository.js"

export const createMessageController = async (req, res) => {
    try {
        const { content } = req.body
        const user_id = req.user._id
        const { chat_id } = req.params

        
        // Creo el chat en la base de datos
        const created_message = await messageRepository.createMessage({
            sender: user_id,
            content,
            chat_id,
        })





        return res.status(201).send({
            ok: true,
            message: "Message created successfully",
            status: 201,
            payload: {
                created_message
            }
        })




    } catch (err) {
        handleControllerError(res, err, 'Error while creating a new message')
    }
}

/* 
export const getUserChatsController = async (req, res) => {
    try {
        const user_id = req.user.id
        const chats = await chatRepository.findUserChats(user_id)

        return res.status(200).send({
            ok: true,
            message: "Chats found successfully",
            status: 200,
            payload: {
                chats
            }
        })

    } catch (err) {
        handleControllerError(res, err, "Error while getting the chats of the logged in user")
    }
} */