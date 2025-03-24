import { handleControllerError } from "../utils/errors.utils.js"
import chatRepository from "../repository/chat.repository.js"
export const createChatController = async (req, res) => {
    try {
        const { invited_ids, group_name } = req.body
        const user_id = req.user._id


        // Covierto `invited_id` en un array si es un solo ID
        const members = Array.isArray(invited_ids) ? invited_ids : [invited_ids];

        console.log('Members: ', members);
        // Creo el chat en la base de datos
        const created_chat = await chatRepository.createChat({
            created_by: user_id,
            members,
            group_name: group_name || null
        })





        return res.status(201).send({
            ok: true,
            message: "Chat created successfully",
            status: 201,
            payload: {
                created_chat
            }
        })




    } catch (err) {
        handleControllerError(res, err, 'Error while creating a new chat')
    }
}


export const getUserChatsController = async (req, res) => {
    try {
        const user_id = req.user._id
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
}