const mongoose = require('mongoose')

const Comment = new mongoose.Schema({
    userId: { type: String, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
    likes: { type: [String], default: [] },
    postId: { type: String, required: true },
})

const model = mongoose.model('Comment', Comment)

module.exports = model
