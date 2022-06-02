const jwt = require('jsonwebtoken')
const User = require('../../models/register.model')

const reqAuth = async (req, res, next) => {
    console.log('reqAuth')
    let repeat = 0

    let token = ''
    while (repeat !== 25) {
        token = await req.headers.authorization
        if (token) {
            repeat = 24
        }
        repeat++
        console.log(repeat)
    }

    const toDecode = token.replace(/"/g, '')
    console.log('toDecode', toDecode)
    //for every request in the fe, send the token in headers
    if (token) {
        jwt.verify(
            toDecode,
            'secretkey', //just a placeholder, send a real headers from FE that contains the token
            async function (err, decoded) {
                console.log('decoded', decoded)
                if (decoded) {
                    const user = await User.findOne({ email: decoded.email })
                    if (user === null) {
                        return res.json({
                            status: 'error',
                            message: 'User not found',
                        })
                    }
                    return next()
                }
                console.log('err', err)
            }
        )
    }
}

module.exports = { reqAuth }
