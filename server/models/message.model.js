const mongoose = require('mongoose')

const Message = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    roomId: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    deletedFrom: { type: Boolean, default: false },
    deletedTo: { type: Boolean, default: false },
})

const model = mongoose.model('Message', Message)

module.exports = model
