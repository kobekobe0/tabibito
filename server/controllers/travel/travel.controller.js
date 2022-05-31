const Travel = require('../../models/travel.model')
const Userdata = require('../../models/register.model')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const getPublicTravels = async (req, res) => {
    const travels = await Travel.find({ private: false })
    res.json(travels)
}

const getTravelById = async (req, res) => {
    //use fs to send images from upload folder to client
    const travelId = req.params.id
    const travel = await Travel.findById(travelId)
    res.json(travel)
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
    const budget = req.body.budget
    if (budget) {
        const updatedTravel = await Travel.findByIdAndUpdate(travel, {
            $set: {
                budget: {
                    food: budget.food,
                    accommodation: budget.accommodation,
                    transportation: budget.transportation,
                    other: budget.other,
                },
            },
        })
    }
    const updatedTravel = await Travel.findByIdAndUpdate(travel, {
        $set: {
            title: req.body.title,
            location: req.body.location,
            description: req.body.description,
            private: req.body.private,
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
}
