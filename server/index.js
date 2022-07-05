const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const PORT = 3000
const process = require('node:process')
const server = require('http').createServer(app)
app.use(cors())
app.use(express.json())
const Travel = require('./models/travel.model')
const Message = require('./models/message.model')
const { reqAuth } = require('./middleware/auth/auth')

const mongoose = require('mongoose')
const {
    registerUser,
    loginUser,
    verifyLogin,
    verifyEmail,
    getVerificationTicket,
} = require('./controllers/register/register.controller')

const {
    createComment,
    deleteComment,
    editComment,
    getCommentByIdPostId,
} = require('./controllers/comment/comment.controller')

const {
    getPublicTravels,
    getTravelById,
    createTravel,
    updateTravel,
    getUserTravels,
    deleteTravel,
    getPreviewImage,
    updateUser,
    getUserById,
    likeTravel,
    saveTravel,
    follow,
    searchAnything,
    searchMoreUser,
    searchMoreTravel,
} = require('./controllers/travel/travel.controller')

const {
    sendMessage,
    receiveMessage,
    createRoom,
    getRoomById,
    getLastMessage,
    getRoomsByParticipants,
    getMessagesByRoomId,
} = require('./controllers/message/message.controller')
const bodyParser = require('body-parser')
const path = require('path')
const uploadMulter = require('./middleware/auth/travel')
const UpdateProfileImg = require('./middleware/auth/UpdateProfileImg')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const uri =
    'mongodb+srv://kobekoblanca:Chixxmagnet00@cluster0.kcbgjsu.mongodb.net/?retryWrites=true&w=majority'

const db = mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to database')
    })

const { Server } = require('socket.io')

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3001', //placeholder
        methods: 'GET, POST, PUT, DELETE, OPTIONS',
    },
})

io.on('connection', (socket) => {
    console.log('User connected')
    socket.on('p2p_connection', (data) => {
        //connect after user login
        socket.join(data.userId)
    })

    //const pipeline = [{ $match: {} }]
    const changeStream = Message.watch() //listen for canges in message collection
    changeStream.on('change', (changeEvent) => {
        console.log('something has change')
        console.log(changeEvent.operationType)

        if (changeEvent.operationType === 'insert') {
            //limit emit to one
            console.log(changeEvent.fullDocument.to)
            io.to(changeEvent.fullDocument.to).emit('p2p_message_receive', {
                userId: changeEvent.fullDocument,
            })
        }
    })

    socket.on('join_room', (data) => {
        console.log('Joining room: ', data.room)
        socket.join(data.room)
    })

    socket.on('send_message', (data) => {
        if (sendMessage(data.room, data.message, data.from, data.to, socket)) {
            io.to(data.room).emit('receive_message', data)
        }
    })

    socket.on('leave_room', (data) => {
        console.log('leaving room: ', data.room)
        socket.leave(data.room)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})
app.post('/api/users/register', registerUser)
app.post('/api/users/login', loginUser)
app.get('/api/users/login', verifyLogin)

app.use('/api/travel', reqAuth) //adds verification to all routes below

app.use(express.static('uploads'))
app.use(express.static('pfp'))
app.use(express.static('background'))
app.put('/api/user/:id', UpdateProfileImg, updateUser)
app.post('/api/user/follow', follow)
app.get('/api/user/:id', getUserById)
app.get('/api/travel/public', getPublicTravels)
app.get('/api/travel/user/:id', getUserTravels)
app.post('/api/travel/preview/', getPreviewImage)
app.get('/api/travel/:id', getTravelById)

//upload

//TODO
//Send the image to the client every request

app.post('/api/travel/', uploadMulter, createTravel)

app.delete('/api/travel/:id', deleteTravel)

app.put('/api/travel/:id', updateTravel)

app.put('/api/travel/:id/like', likeTravel)
app.put('/api/travel/:id/save', saveTravel)

app.get('/api/search', searchAnything)
app.get('/api/search/user', searchMoreUser)
app.get('/api/search/travel', searchMoreTravel)
app.post('/api/verify', verifyEmail)
app.get('/api/verify/:ticketId', getVerificationTicket)

app.use('/api/comment', reqAuth)
app.post('/api/comment/', createComment)
app.post('/api/comment/:commentId', deleteComment) //delete
app.put('/api/comment/:commentId', editComment)
app.get('/api/comment/:postId', getCommentByIdPostId)

app.get('/api/rooms/:userId', getRoomsByParticipants)
app.post('/api/rooms/:id', getRoomById)
app.get('/api/lastmessage/:roomId', getLastMessage)
app.get('/api/messages/:roomId', getMessagesByRoomId)

server.listen(PORT || 3000, () => {
    console.log('Server is running on port ' + PORT)
})

process.on('uncaughtException', function (err) {
    console.error(err)
    console.log('Node NOT Exiting...')
})
