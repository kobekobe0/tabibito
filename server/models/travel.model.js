const mongoose = require('mongoose')

const Budget = new mongoose.Schema({
    food: { type: Number, required: true },
    accommodation: { type: Number, required: true },
    transportation: { type: Number, required: true },
    other: { type: Number, required: true },
})
const Location = new mongoose.Schema({
    country: { type: String, required: true },
    city: { type: String, required: true },
    town: { type: String, required: true },
})
const TravelerLocation = new mongoose.Schema({
    country: { type: String, required: true },
    city: { type: String, required: true },
    town: { type: String, required: true },
})

//FUCKING IMAGES
const Travel = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        images: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { timestamps: true }
)

const model = mongoose.model('Traveldata', Travel)

module.exports = model
