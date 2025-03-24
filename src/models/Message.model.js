import mongoose, { mongo } from "mongoose";

export const MESSAGE_PROPS = {
    ID: '_id',
    SENDER: 'sender',
    CONTENT: 'content',
    CREATED_AT: 'created_at',
    CHAT_ID: 'chat_id'
}


const messageSchema = new mongoose.Schema({
    [MESSAGE_PROPS.SENDER] : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    [MESSAGE_PROPS.CONTENT] : {
        type: String,
        required: true
    },
    [MESSAGE_PROPS.CREATED_AT] : {
        type: Date,
        default: Date.now
    },
    [MESSAGE_PROPS.CHAT_ID] : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    }
})


const Message = mongoose.model('Message', messageSchema)
export default Message