const mongoose = require('mongoose');

const Schema = mongoose.Schema

//Sets schema inside of exercises
const setsSchema = new Schema({
    rep:{
        type:Number
    },
    weight: {
        type:Number 
    }
})
// exercises schema inside of workout
const exerciseSchema = new Schema({
    type: {
        type: String,
        unique: false,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    duration: {
        type:Number
    },
    distance: {
        type:Number
    },
    sets: [{ 
        type: setsSchema,
        required: true
    }]
})

//Workout schema
const workoutSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    day: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    exercise: [{
        type: exerciseSchema,
        required: true
    }],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

