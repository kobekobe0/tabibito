const mongoose = require('mongoose')

const Room = new mongoose.Schema({
    participant1: { type: String, required: true },
    participant2: { type: String, required: true },
    dateModified: { type: Date, default: Date.now },
})

const model = mongoose.model('Room', Room)

module.exports = model
