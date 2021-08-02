import mongoose from 'mongoose';


// creating post model and specifying its contents

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

// setting up Post Message collection on DB

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;