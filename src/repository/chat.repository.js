import Chat, { CHAT_PROPS } from "../models/Chat.model.js"
import { ServerError } from "../utils/errors.utils.js"
import userRepository from "./auth.repository.js"
import User from "../models/User.model.js"

class ChatRepository {

    async findByIdAndUpdate(chat_id, created_message) {
        return await Chat.findByIdAndUpdate(chat_id, {
            $push: { messages: created_message._id }
        });
    }



    async findExistingChat(members) {
        return await Chat.findOne({
            [CHAT_PROPS.MEMBERS]: { $all: members, $size: members.length }
        })
    }
    async findChatById(id) {
        return await Chat.findById(id)
    }

    async createChat({ created_by, members, group_name }) {


        // valido si los usuarios invitados estan verificados
        const users = await User.find({ _id: { $in: members } })
        
        const verifiedUsers = users.filter(user => user.verified)
        if (verifiedUsers.length !== members.length) throw new ServerError("Some users are not verified", 400);


        // agrego al creador a la lista de miembros
        members.push(created_by)

        // Verifico si es un grupo

        const is_group = members.length > 2
        console.log('Is grupo: ', is_group);


        // Valido que el chat ya no exista previamente
        const existingChat = await this.findExistingChat(members)
        if (existingChat) return existingChat




        // creo el chat nuevo
        const created_chat = await Chat.create({
            [CHAT_PROPS.CREATED_BY]: created_by,
            [CHAT_PROPS.MEMBERS]: members,
            [CHAT_PROPS.IS_GROUP]: is_group,
            [CHAT_PROPS.GROUP_NAME]: is_group ? group_name : null,

        })


        return created_chat
    }

    async findUserChats(user_id) {
        return await Chat.find({
            [CHAT_PROPS.MEMBERS]: { $in: [user_id] }
        })
            .populate("messages", 'content created_at sender')
            .populate('members', 'username avatar')


    }

}

const chatRepository = new ChatRepository
export default chatRepository