const mongoose = require('mongoose')

const Budget = new mongoose.Schema({
    food: { type: Number, required: true },
    accommodation: { type: Number, required: true },
    transportation: { type: Number, required: true },
    other: { type: Number, required: true },
})

const Travel = new mongoose.Schema({
    userId: { type: String, required: true },
    images: {
        type: [String],
        required: true,
    },
    budget: Budget,
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    private: { type: Boolean, required: true },
    deleted: { type: Boolean, required: true },
})

const model = mongoose.model('Traveldata', Travel)

module.exports = model
