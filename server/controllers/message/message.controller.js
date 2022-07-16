const Message = require('../../models/message.model')
const Room = require('../../models/room.model')
const Userdata = require('../../models/register.model')

const sendMessage = async (roomId, message, from, to, socket) => {
    try {
        const msg = await Message.create({
            from: from,
            to: to,
            roomId: roomId,
            message: message,
        })

        socket.emit('send_message')
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

const receiveMessage = async (msgFieldId) => {
    const msg = await Message.findOne({
        _id: msgFieldId,
    })
    return msg
}

const createRoom = async (participant1, participant2) => {
    const existingRoom = await Room.findOne({
        participant1,
        participant2,
    })
    if (existingRoom) {
        return existingRoom
    }
    const room = await Room.create({
        participant1,
        participant2,
    })
    return room
}

const getRoomById = async (req, res) => {
    //return id of room and user that you are talking to
    const { userId } = req.body
    const room = await Room.findOne({
        _id: req.params.id,
    })
    let toReturn = {
        roomId: room._id,
        otherPersonId: null,
    }
    if (room.participant1 == userId) {
        toReturn.otherPersonId = room.participant2
    } else {
        toReturn.otherPersonId = room.participant1
    }

    res.json(toReturn)
}

const getRoomsByUserId = async (req, res) => {
    //returns all rooms that user is in
    const { userId } = req.params

    try {
        const rooms = await Room.find({
            $or: [{ participant1: userId }, { participant2: userId }],
        }) //pagination here
        res.json(rooms)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}

const getLastMessage = async (req, res) => {
    //for chat list window
    const { roomId } = req.params
    const message = await Message.findOne({
        roomId: roomId,
    })
        .sort({ date: -1 })
        .limit(1)
    res.json(message)
}

const getMessagesByRoomId = async (req, res) => {
    const { roomId } = req.params
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    let results = {}

    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
            limit: limit,
        }
    }
    if (
        endIndex <
        (await Message.countDocuments({
            roomId: roomId,
        }))
    ) {
        results.next = {
            page: page + 1,
            limit: limit,
        }
    }

    let lengthMessage =
        (await Message.countDocuments({
            roomId: roomId,
        })) / limit

    results.lengthData = Math.ceil(lengthMessage)

    results.result = await Message.find({ roomId: roomId })
        .limit(limit)
        .skip(startIndex)
        .sort({ date: -1 })

    return res.json(results)
}

const getRoomsByUsername = async (req, res) => {
    const userId = req.params.userId
    const usernameQuery = req.query.searchQuery
    const user = await Userdata.findOne({
        _id: userId,
    })

    let idToQuery = user.following.concat(user.followers)

    const usersResult = await Userdata.find({
        _id: { $in: idToQuery },
        name: { $regex: usernameQuery, $options: 'i' },
    })

    //if(user.following.contains)

    res.json(usersResult)
}

module.exports = {
    sendMessage,
    receiveMessage,
    createRoom,
    getRoomById,
    getLastMessage,
    getRoomsByUserId,
    getMessagesByRoomId,
    getRoomsByUsername,
}
