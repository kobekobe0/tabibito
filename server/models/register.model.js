const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        //add user pfp later
        pfp: { type: String, default: 'pfp\\anya.jpg' },
        //add user background later
        background: { type: String, default: 'background\\bg.jpg' },
        bio: {
            type: String,
            default:
                'The world is a book and those who do not travel read only one page',
        },
        saves: {
            type: [String],
            default: [],
        },
        following: {
            type: [String],
            default: [],
        },
        followers: {
            type: [String],
            default: [],
        },
    },
    { collection: 'user-data' }
)

const model = mongoose.model('Userdata', User)

module.exports = model
