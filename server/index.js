const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000

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
app.listen(PORT || 3000, () => {
    console.log('Server is running on port ' + PORT)
})
