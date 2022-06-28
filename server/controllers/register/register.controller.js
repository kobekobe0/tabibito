const User = require('../../models/register.model')
const VerificationTickets = require('../../models/EmailVerification.model.js')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const saltRounds = 1542 //placeholder for salt rounds

const nodemailer = require('nodemailer')

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
}

const makeid = () => {
    var text = ''
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kobe0santos0@gmail.com',
        pass: 'gvmltsfynclouydj',
    }, //placeholder
})

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

                const code = makeid()
                await VerificationTickets.create({
                    email: email,
                    code: code,
                    isVerified: false,
                })
                    .then((ticket) => {
                        const mailOptions = {
                            from: 'Tabibito',
                            to: email,
                            subject: 'Tabibito Verification Code',
                            text: `Your verification code is ${code}`,
                        }
                        transporter.sendMail(
                            mailOptions,
                            async function (error, info) {
                                if (error) {
                                    console.log(error)
                                    return res.json({
                                        message: 'Error sending email',
                                        status: 400,
                                    })
                                } else {
                                    console.log('Email sent: ' + info.response)
                                    const createdUser = await User.create({
                                        name: name,
                                        email: email,
                                        password: hash,
                                        VerificationTicket: ticket._id,
                                    })
                                    res.json(createdUser)
                                }
                            }
                        )
                    })
                    .catch((error) => {
                        console.log(error)
                        return res.json({
                            message: 'Error creating user',
                            status: 400,
                        })
                    })
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

    try {
        bcrypt.compare(
            req.body.password,
            user.password,
            async function (err, result) {
                // result == true
                if (result == true) {
                    const verify = await VerificationTickets.findOne({
                        _id: user.VerificationTicket,
                    }).then((ticket) => {
                        if (ticket.isVerified == true) {
                            const token = jwt.sign(
                                {
                                    name: user.name,
                                    email: user.email,
                                    id: user._id,
                                    pfp: user.pfp,
                                    background: user.background,
                                    bio: user.bio,
                                    saves: user.saves,
                                },
                                'secretkey'
                            ) //secretkey should be super secured
                            return res.json({
                                status: 'OK',
                                isVerified: true,
                                user: token,
                            })
                        } else {
                            return res.json({
                                status: 'Email not verified',
                                statusCode: 400,
                                isVerified: false,
                                ticketId: ticket._id,
                            })
                        }
                    })
                }
                return res.json({
                    user: false,
                    message: "Can't find user",
                    status: 404,
                })
            }
        )
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            error: error.message,
            message: 'Wrong credentials',
        })
    }
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

const verifyEmail = async (req, res) => {
    const ticketId = req.body.ticketId
    const code = req.body.code
    try {
        const ticket = await VerificationTickets.findOne({ _id: ticketId })
        if (ticket.code == code) {
            await VerificationTickets.findOneAndUpdate(
                { _id: ticketId },
                { isVerified: true }
            )
            return res.json({ status: 200, message: 'Email verified' })
        } else {
            return res.json({ status: 400, message: 'Wrong code' })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 400, message: 'Error verifying email' })
    }
}

const getVerificationTicket = async (req, res) => {
    const ticketId = req.params.ticketId
    try {
        const ticket = await VerificationTickets.findOne({ _id: ticketId })
        if (ticket) {
            return res.json({ status: 200, ticket: ticket })
        } else {
            return res.json({ status: 400, message: 'Ticket not found' })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 400, message: 'Error getting ticket' })
    }
}

module.exports = {
    registerUser,
    loginUser,
    verifyLogin,
    verifyEmail,
    getVerificationTicket,
}
