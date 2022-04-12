const User = require('../../models/register.model')

const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = { name, email, password }
        await User.create(user)
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message,
            message: 'Duplicate email',
        })
    }
}

const loginUser = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if (user) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            'secretkey'
        ) //secretkey should be super secured
        return res.json({ status: 'OK', user: token })
    }
    return res.json({ user: false })
}

const verifyLogin = async (req, res) => {
    const token = req.headers['token']

    try {
        const decoded = jwt.verify(token, 'secretkey')
        const email = decoded.email
        const user = await User.findOne({ email: email })\

        return res.json
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error' })
    }
}

module.exports = { registerUser, loginUser, verifyLogin }
