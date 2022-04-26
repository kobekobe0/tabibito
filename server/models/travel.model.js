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

const Travel = new mongoose.Schema({
    userId: { type: String, required: true },
    images: {
        type: [Object],
        required: true,
    },
    budget: Budget,
    title: { type: String, required: true },
    location: Location,
    transportationType: { type: String, required: true },
    travelerLocation: TravelerLocation,
    description: { type: String, required: true },
    private: { type: Boolean, required: true },
    deleted: { type: Boolean, required: true },
    duration: { type: Number, required: true },
})

const model = mongoose.model('Traveldata', Travel)

module.exports = model
