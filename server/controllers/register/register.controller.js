const User = require('../../models/register.model')

const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = { name, email, password }
        await User.create(user)
        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message,
            message: 'Duplicate email',
        })
    }
}

const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

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

module.exports = { registerUser, loginUser }
