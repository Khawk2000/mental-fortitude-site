const express = require('express')

// controller functions 
const { signupUser, loginUser, getUser } = require('../controllers/userController')

const router = express.Router()

//get user info route
router.get('/', getUser)

//login route
router.post('/login', loginUser)


//signup route
router.post('/signup', signupUser)


module.exports = router