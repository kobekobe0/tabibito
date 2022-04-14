const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000

const Travel = require('./models/travel.model')
const { reqAuth } = require('./middleware/auth/auth')

const mongoose = require('mongoose')
const {
    registerUser,
    loginUser,
    verifyLogin,
} = require('./controllers/register/register.controller')

const {
    getPublicTravels,
    getTravelById,
    createTravel,
    updateTravel,
    getUserTravels,
} = require('./controllers/travel/travel.controller')
mongoose.connect('mongodb://localhost:27017/tabibito')

app.use(cors())
app.use(express.json())

app.post('/api/users/register', registerUser)
app.post('/api/users/login', loginUser)
app.get('/api/users/login', verifyLogin)

app.use('/api/travel', reqAuth)

app.get('/api/travel/public', getPublicTravels)
app.get('/api/travel/user/:id', getUserTravels)
app.get('/api/travel/:id', getTravelById)
app.post('/api/travel/', createTravel)
app.put('/api/travel/:id', updateTravel)

app.listen(PORT || 3000, () => {
    console.log('Server is running on port ' + PORT)
})
