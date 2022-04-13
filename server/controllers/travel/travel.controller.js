const Travel = require('../../models/travel.model')

const jwt = require('jsonwebtoken')

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
    const newTravel = await Travel.create(travel)
    res.json(newTravel)
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
    res.json(travels)
}

module.exports = {
    getPublicTravels,
    getTravelById,
    createTravel,
    updateTravel,
    getUserTravels,
}
