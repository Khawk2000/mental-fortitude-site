const mongoose = require('mongoose');

const Schema = mongoose.Schema

const setsSchema = new Schema({
    rounds: {
        type:Number
    },
    duration: {
        type:Number
    },
    distance: {
        type:Number
    },
    reps:{
        type:Number
    },
    weight: {
        type:Number 
    }
})

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
    sets: { 
        type: setsSchema,
        required: true
    }
})

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
        unique: true
    },
    exercise: [{
        type: exerciseSchema,
        required: true
    }],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

