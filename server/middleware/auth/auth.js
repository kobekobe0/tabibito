const jwt = require('jsonwebtoken')
const User = require('../../models/register.model')

const reqAuth = async (req, res, next) => {
    console.log('reqAuth')
    const token = req.headers.authorization

    jwt.verify(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia29iZSIsImVtYWlsIjoia29iZUBrb2JlIiwiaWQiOiI2MjU0NDgyZmQ4NzJkNjVkN2U3OTlkNmQiLCJpYXQiOjE2NTA4OTQ3MzF9.sJFAk2_GuH4TSjTZlRQi9VIZ6O99VgZf4uLuFJETYcQ',
        'secretkey', //just a placeholder, send a real headers from FE that contains the token
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
