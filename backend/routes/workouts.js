const express = require('express');
const {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const router = express.Router();

//Get all workouts
router.get('/', getAllWorkouts)

//Get single workout
router.get('/:id', getWorkout)

//Post new workout
router.post('/createworkout', createWorkout)

//Delete workout
router.delete('/:id', deleteWorkout)

//Update workout
router.patch('/:id', updateWorkout)

module.exports = router