const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema


// Be sure to add first name and last name mostly just for displaying welcome back message
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    }

})

// static signup method
userSchema.statics.signup = async function(email, password, firstName, lastName) {

    //validation
    if(!email || !password || !firstName || !lastName){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Emails is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password weak af, needs fortification')
    }

    const exists = await this.findOne({ email })

    if(exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, firstName, lastName })

    return user
}


// static login method
userSchema.statics.login = async function(email, password) {
    
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorret password')
    }

    return user
}


module.exports = mongoose.model("User", userSchema)