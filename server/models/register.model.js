const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        //add user pfp later
        //add user background later
    },
    { collection: 'user-data' }
)

const model = mongoose.model('Userdata', User)

module.exports = model
