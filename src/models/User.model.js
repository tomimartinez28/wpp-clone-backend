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
        default: ''
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