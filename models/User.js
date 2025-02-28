import mongoose, {  Schema } from "mongoose";
const UserSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    profilePic:{
        type:String,
        default: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2581"
    }
}, {timestamps: true})

const User = mongoose.model('User', UserSchema)
export default User;