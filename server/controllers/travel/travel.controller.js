const Travel = require('../../models/travel.model')
const Userdata = require('../../models/register.model')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const getPublicTravels = async (req, res) => {
    //?page=2&limit=3

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
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
        (await Travel.countDocuments({
            //public === false
            //private === true
            private: false,
        }))
    ) {
        results.next = {
            page: page + 1,
            limit: limit,
        }
    }

    let lengthTravel =
        (await Travel.countDocuments({
            private: false,
        })) / limit

    results.lengthData = Math.ceil(lengthTravel)

    results.result = await Travel.find({ private: false })
        .limit(limit)
        .skip(startIndex)
        .sort({ createdAt: -1 })

    return res.json(results)
}

const getTravelById = async (req, res) => {
    //use fs to send images from upload folder to client
    const travelId = req.params.id
    const travel = await Travel.findById(travelId)
    res.json(travel)
}

const getUserById = async (req, res) => {
    const userId = req.params.id
    console.log('userID', userId)
    const user = await Userdata.findById(userId)
    if (user) {
        res.json(user)
    } else {
        res.json({ message: 'user not found' })
    }
}

// Where fileName is name of the file and response is Node.js Reponse.

const createTravel = async (req, res) => {
    const travel = req.body
    console.log(req.files)
    const image = req.files
    let tempArr = []
    for (let i = 0; i < image.length; i++) {
        tempArr.push(image[i].path)
    }
    console.log(req.file)
    const newTravel = await Travel.create({
        ...travel,
        images: tempArr,
    })

    res.json({ message: 'success', newTravel })
}

const updateUser = async (req, res) => {
    const userId = req.params.id
    const user = req.body
    console.log(user)
    const updatedUser = await Userdata.findByIdAndUpdate(userId, {
        $set: {
            name: user.name,
            pfp: user.pfp,
            background: user.background,
            bio: user.bio,
        },
    })

    const userData = await Userdata.findById(userId)

    const token = jwt.sign(
        {
            name: userData.name,
            email: userData.email,
            id: userData._id,
            pfp: userData.pfp,
            background: userData.background,
            bio: userData.bio,
            saves: userData.saves,
            following: userData.following,
            followers: userData.followers,
        },
        'secretkey'
    )
    res.json(token)
}

const updateTravel = async (req, res) => {
    const travel = req.params.id
    const {
        title,
        description,
        locationTown,
        locationCity,
        locationCountry,
        accommodation,
        transportation,
        food,
        other,
        transportationType,
        travelerTown,
        travelerCity,
        travelerCountry,
        travelerCount,
    } = req.body
    const updatedTravel = await Travel.findByIdAndUpdate(travel, {
        $set: {
            title: title,
            description: description,
            locationTown: locationTown,
            locationCity: locationCity,
            locationCountry: locationCountry,
            accommodation: accommodation,
            transportation: transportation,
            food: food,
            other: other,
            transportationType: transportationType,
            travelerTown: travelerTown,
            travelerCity: travelerCity,
            travelerCountry: travelerCountry,
            travelerCount: travelerCount,
        },
    })
    res.json(updatedTravel)
}

const deleteTravel = async (req, res) => {
    const travelId = req.params.id

    //delete images in upload folder in the server
    await Travel.findById(travelId).then((travel) => {
        travel.images.forEach((image) => {
            fs.unlink(path.join(__dirname, image), (err) => {
                if (err) {
                    console.log(err)
                }
            })
        })
    })

    await Travel.findByIdAndDelete(travelId)
        .then((travel) => {
            res.json({
                message: 'successfully deleted',
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

const getUserTravels = async (req, res) => {
    //send images from the server to the client
    //using the identifier from travels
    //only send the first image, title, town, city, and country

    const userId = req.params.id
    //only return fields of locationTown and locationCity
    const travels = await Travel.find({
        userId: userId,
    })
    //only return image and title
    res.json(travels)
}

const getPreviewImage = async (req, res) => {
    const PATH = path.join(__dirname, `../../${req.body.image}`)
    console.log(req.body)
    res.download(PATH)
}

module.exports = {
    getPublicTravels,
    getTravelById,
    createTravel,
    updateTravel,
    getUserTravels,
    deleteTravel,
    getPreviewImage,
    updateUser,
    getUserById,
}
