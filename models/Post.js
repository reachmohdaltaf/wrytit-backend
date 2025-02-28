import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 100
    },
    content:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now()

    }
})

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
