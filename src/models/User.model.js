import mongoose from "mongoose";

export const USER_PROPS = {
    ID: '_id',
    EMAIL: 'email',
    PASSWORD: 'password',
    USERNAME: 'username',
    AVATAR: 'avatar',
    INFO: 'info',
    VERIFIED: 'verified',
    VERIFICATION_TOKEN: 'verification_token',
    CREATED_AT: 'created_at',
    MODIFIED_AT: 'modified_at',
    ACTIVE: 'active'
}



const userSchema = new mongoose.Schema({
    [USER_PROPS.EMAIL]: {
        type: String,
        required: true,
        unique: true
    },
    [USER_PROPS.PASSWORD]: {
        type: String,
        required: true,
    },
    [USER_PROPS.USERNAME]: {
        type: String,
        required: true,
        unique: true
    },
    [USER_PROPS.AVATAR]: {
        type: String,
        default: "data:image/png;base64,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"
    },
    [USER_PROPS.INFO]: {
        type: String,
    },
    [USER_PROPS.VERIFIED]: {
        type: Boolean,
        required: true,
        default: false,
    },
    [USER_PROPS.VERIFICATION_TOKEN]: {
        type: String,
    },
    [USER_PROPS.CREATED_AT]: {
        type: Date,
        default: Date.now

    },
    [USER_PROPS.MODIFIED_AT]: {
        type: Date,
    },
    [USER_PROPS.ACTIVE]: {
        type: Boolean,
        default: true,
        required: true,
    }
})

const User = mongoose.model('User', userSchema)

export default User