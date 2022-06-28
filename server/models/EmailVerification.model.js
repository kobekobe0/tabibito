const mongoose = require('mongoose')

function makeid() {
    var text = ''
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
}

const VerificationTicket = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        code: { type: String, required: true },
    },
    { collection: 'verification-tickets' }
)

const model = mongoose.model('VerificationTicket', VerificationTicket)

module.exports = model
