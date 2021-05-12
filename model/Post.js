const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    subReddit: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        required: true,
    },
    comments: {
        type: Array,
        required: true,
    },
});

module.exports = Post = mongoose.model("posts", PostSchema);
