const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getAllWorkouts = async (req, res) => {
    const user_id = req.user._id

    const workouts = await Workout.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Workout does not exist'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'Workout does not exist'})
    }

    res.status(200).json(workout)
}

// create workout
const createWorkout = async (req, res) => {
    
    //clean this up later
    const day = req.body.day
    const title = req.body.title
    const type = req.body.exercise.type
    const name = req.body.exercise.name 
    const exercise = req.body.exercise
    const rounds = exercise.rounds
    const duration = exercise.duration
    const distance = exercise.distance
    const reps = exercise.reps
    const weight = exercise.weight
    
    // add doc to db
    try{
        const user_id = req.user._id
        const workout = await Workout.create({user_id, day, title, exercise, type, name, rounds, duration, distance, reps, weight})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Cannot delete a workout that does not exist'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})
    
    if (!workout){
        return res.status(404).json({error: 'Cannot delete a workout that does not exist'})
    }

    res.status(200).json(workout)
}

// update workout
// Not implemented yet but need to work things out
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Cannot update a workout that does not exist'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout){
        return res.status(404).json({error: 'Cannot update a workout that does not exist'})
    }

    res.status(200).json(workout)
}



module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}