const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000

const Travel = require('./models/travel.model')

const mongoose = require('mongoose')
const {
    registerUser,
    loginUser,
    verifyLogin,
} = require('./controllers/register/register.controller')
mongoose.connect('mongodb://localhost:27017/tabibito')

app.use(cors())
app.use(express.json())
app.post('/api/users/register', registerUser)
app.post('/api/users/login', loginUser)
app.get('/api/users/login', verifyLogin)

app.get('/api/travel/public', async (req, res) => {
    const travels = await Travel.find({ private: false })
    res.json(travels)
})

app.get('/api/travel/:id', async (req, res) => {
    const travelId = req.params.id
    const travel = await Travel.findById(travelId)
    res.json(travel)
})

app.post('/api/travel/', async (req, res) => {
    const travel = req.body
    const newTravel = await Travel.create(travel)
    res.json(newTravel)
})

app.put('/api/travel/:id', async (req, res) => {
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
            images: req.body.images,
            title: req.body.title,
            location: req.body.location,
            description: req.body.description,
            private: req.body.private,
        },
    })
    res.json(updatedTravel)
})

app.listen(PORT || 3000, () => {
    console.log('Server is running on port ' + PORT)
})
