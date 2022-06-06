const mongoose = require('mongoose')

const Travel = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        images: {
            type: [String],
            trim: true,
            required: true,
        },

        food: { type: Number, required: true },
        accommodation: { type: Number, required: true },
        transportation: { type: Number, required: true },
        other: { type: Number, required: true },
        title: { type: Object, required: true },

        locationCountry: { type: String, required: true },
        locationCity: { type: String, required: true },
        locationTown: { type: String, required: true },
        transportationType: { type: String, required: true },

        travelerCountry: { type: String, required: true },
        travelerCity: { type: String, required: true },
        travelerTown: { type: String, required: true },
        description: { type: String, required: true },
        private: { type: Boolean, required: true },
        deleted: { type: Boolean, required: true },
        duration: { type: Number, required: true },
        likes: { type: [String], required: true },
        saves: { type: [String], default: [] },
        username: { type: String, required: true },
        Date: { type: Date, default: Date.now },
        travelerCount: { type: Number, required: true },
    },
    { timestamps: true }
)

const model = mongoose.model('Traveldata', Travel)

module.exports = model
