import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ExerciseForm from '../components/ExerciseForm';

var listexercises = []

const CreateWorkout = () => {
    const navigate = useNavigate()
    const [exercise, setExercise] = useState(null)
    const [error, setError] = useState(null)
    const [title, setTitle] = useState('')
    const [titleconfirmed, setTitleConfirmed] = useState(false)

    useEffect(() => {
        if (!exercise){
            listexercises = []
            console.log(listexercises)
        }else{
            listexercises.push(exercise)
            console.log(listexercises)
        }
    }, [exercise, titleconfirmed])

    const ConfirmTitle = () => {
        setTitleConfirmed(true)
    }

    const postWorkout = async () => {
        const day = Date.now()
        const workout = {day, title, exercise: listexercises}
        console.log(workout)
        const response = await fetch('api/workouts/createworkout/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            console.log(error)
        }
        if (response.ok) {
            setError(null)
            console.log('new exercise added', json)
            navigate('/')
        }

    }

    const exercises = (data) => {
        setExercise(data)
    }
    
    return(
        <div className="create-workout">
            {titleconfirmed === false && <div>
                    <label>Title: </label>
                    <input type='text' onChange={(e) => setTitle(e.target.value)} value={title}/>
                    <button onClick={ConfirmTitle}>Confirm Title</button>
            </div>}
            {titleconfirmed === true && <h3>Title: {title}</h3>}
            {titleconfirmed === true && <ExerciseForm exercises={exercises} title={title}/>}
            {exercise && <div>{exercise.type}</div>}
            {titleconfirmed === true && <button onClick={postWorkout}>Add Workout</button>}
        </div>
    )
}

export default CreateWorkout;