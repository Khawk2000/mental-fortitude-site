const mongoose = require('mongoose');

const Schema = mongoose.Schema

const setsSchema = new Schema({
    rep:{
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

const workoutSchema = new Schema({
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

