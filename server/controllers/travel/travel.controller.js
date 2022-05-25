const Travel = require('../../models/travel.model')
const multer = require('multer')
const crypto = require('crypto')
const GridFsStorage = require('multer-gridfs-storage')
const path = require('path')

const jwt = require('jsonwebtoken')

//storage engine
const storage = multer.diskStorage({
    destination: '../../uploads/',
    filename: function (req, file, cb) {
        cb(
            null,
            file.originalname +
                '-' +
                Date.now() +
                path.extname(file.originalname)
        )
    },
})
const upload = multer({
    storage: storage,
})

//+++++++++++++

const getPublicTravels = async (req, res) => {
    const travels = await Travel.find({ private: false })
    res.json(travels)
}

const getTravelById = async (req, res) => {
    const travelId = req.params.id
    const travel = await Travel.findById(travelId)
    res.json(travel)
}

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

const getUserTravels = async (req, res) => {
    const userId = req.params.id
    const travels = await Travel.find({
        userId: userId,
    })
    //only return image and title
    res.json(travels)
}

module.exports = {
    getPublicTravels,
    getTravelById,
    createTravel,
    updateTravel,
    getUserTravels,
}
