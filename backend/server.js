require('dotenv').config()

const express = require('express');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')


//Express app
const app = express();

// Middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db

const PORT = process.env.PORT || 3001
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
            console.log('connected to db & listening on port', PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


