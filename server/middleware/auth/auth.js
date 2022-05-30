const jwt = require('jsonwebtoken')
const User = require('../../models/register.model')

const reqAuth = async (req, res, next) => {
    console.log('reqAuth')
    const token = await req.config.headers.authorization
    console.log('token', token)

    //for every request in the fe, send the token in headers
    if (token) {
        jwt.verify(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia29iZSIsImVtYWlsIjoia29iZUBrb2JlIiwiaWQiOiI2MjU0NDgyZmQ4NzJkNjVkN2U3OTlkNmQiLCJpYXQiOjE2NTM4OTA3Nzh9.iAaz98cYXMZ58EPE3go2at6XMk3Cw_H2RUBOIgvjO5A',
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
}

module.exports = { reqAuth }
