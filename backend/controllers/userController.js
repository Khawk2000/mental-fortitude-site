const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// creates json web token with a user id and uses secret key from .env file
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// get single user
const getUser = async (req, res) => {
    console.log(req)
}


//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        const firstName = user.firstName
        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token, firstName})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// signup user
const signupUser = async (req, res) => {

    const {email, password, firstName, lastName} = req.body

    try {
        const user = await User.signup(email, password, firstName, lastName)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token, firstName})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}


module.exports = { signupUser, loginUser, getUser }