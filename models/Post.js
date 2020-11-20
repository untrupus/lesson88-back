const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
    datetime: Date
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;