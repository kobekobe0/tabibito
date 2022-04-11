const User = require('../../models/register.model')

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
        if (user.password === req.body.password) {
            console.log('User logged in')
            return res.json({ user: true })
        }
    }
    return res.json({ user: false })
}

module.exports = { registerUser, loginUser }
