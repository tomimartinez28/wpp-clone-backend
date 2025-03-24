
import { ServerError } from "../utils/errors.utils.js"
import Message, { MESSAGE_PROPS } from "../models/Message.model.js"
import chatRepository from "./chat.repository.js"

class MessageRepository {





    async createMessage({ sender, content, chat_id }) {
        if (!content) throw new ServerError('You have to send a content', 400)
        const found_chat = await chatRepository.findChatById(chat_id)
        if(!found_chat) throw new ServerError("Chat not found", 404)
        if (!found_chat.members.includes(sender)) throw new ServerError('You are not a member of this chat', 403)
        
        const created_message = await Message.create({
            [MESSAGE_PROPS.SENDER]: sender,
            [MESSAGE_PROPS.CONTENT]: content,
            [MESSAGE_PROPS.CHAT_ID]: chat_id
        })
         // Agregar el mensaje al chat
        await chatRepository.findByIdAndUpdate(chat_id, created_message)

        return created_message
    }

}

const messageRepository = new MessageRepository
export default messageRepository