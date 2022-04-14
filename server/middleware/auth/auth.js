const jwt = require('jsonwebtoken')
const User = require('../../models/register.model')

const reqAuth = async (req, res, next) => {
    console.log('reqAuth')
    const token = req.headers.authorization

    jwt.verify(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia29iZSIsImVtYWlsIjoia29iZUBrb2JlIiwiaWF0IjoxNjQ5ODU3MjgyfQ.9HQUzTfPiGhY9Ws3Hjm9bi3DxmD0D-VtD46rP9NedK8',
        'secretkey', //just a placeholder, send a real headers from FE
        async function (err, decoded) {
            console.log(decoded) // bar
            if (decoded.email) {
                const user = await User.findOne({ email: decoded.email })
                if (user === null) {
                    return res.json({
                        status: 'error',
                        message: 'User not found',
                    })
                }
                return next()
            }
        }
    )
}

module.exports = { reqAuth }
