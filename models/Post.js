const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
    datetime: String
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;