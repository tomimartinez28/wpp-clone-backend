import mongoose from "mongoose"

export const CHAT_PROPS = {
    ID: '_id',
    MEMBERS: 'members',
    CREATED_AT : 'created_at',
    CREATED_BY: 'created_by',
    IS_GROUP : 'is_group',
    GROUP_NAME: 'group_name',
    MESSAGES: 'messages',
}


const chatSchema = new mongoose.Schema({
    [CHAT_PROPS.MEMBERS] : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    [CHAT_PROPS.CREATED_AT] : {type: Date, default: Date.now},
    [CHAT_PROPS.CREATED_BY] : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    [CHAT_PROPS.IS_GROUP] : { type: Boolean, default: false },
    [CHAT_PROPS.GROUP_NAME] : { type: String, required: function () { return this.is_group; }, default: null },
    [CHAT_PROPS.MESSAGES]: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] 
})




const Chat = mongoose.model('Chat', chatSchema)
export default Chat