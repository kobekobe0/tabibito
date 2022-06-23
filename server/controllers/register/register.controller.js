const User = require('../../models/register.model')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const saltRounds = 10

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (name.length > 15 || validateEmail(email) == null || !password) {
            return res.json({
                message: 'Wrong credentials',
                status: 400,
            })
        }
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return console.log(err)
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return console.log(err)
                const createdUser = await User.create({
                    name: name,
                    email: email,
                    password: hash,
                })
                res.json(createdUser)
            })
        })
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            error: error.message,
            message: 'Duplicate email',
        })
    }
}

const loginUser = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })

    bcrypt.compare(req.body.password, user.password, function (err, result) {
        // result == true
        if (result == true) {
            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    pfp: user.pfp,
                    background: user.background,
                    bio: user.bio,
                    saves: user.saves,
                    following: user.following,
                    followers: user.followers,
                },
                'secretkey'
            ) //secretkey should be super secured
            return res.json({ status: 'OK', user: token })
        }
        return res.json({
            user: false,
            message: "Can't find user",
            status: 404,
        })
    })
}

const verifyLogin = async (req, res) => {
    // doesn't do anything for now
    const token = req.headers['token']

    try {
        const decoded = jwt.verify(token, 'secretkey')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error' })
    }
}

module.exports = { registerUser, loginUser, verifyLogin }
