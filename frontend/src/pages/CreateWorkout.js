import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ExerciseForm from '../components/ExerciseForm';


const CreateWorkout = () => {
    const navigate = useNavigate()
    const [exercise, setExercise] = useState(null)
    const [error, setError] = useState(null)
    const [title, setTitle] = useState('')
    const [titleconfirmed, setTitleConfirmed] = useState(false)
    const [listExercises, setListExercises] = useState([])

    useEffect(() => {
        if (exercise){
            setListExercises([...listExercises, exercise])
            setExercise(null)
        }
        console.log(listExercises)
    }, [exercise, titleconfirmed, listExercises])

    const ConfirmTitle = () => {
        setTitleConfirmed(true)
    }

    const postWorkout = async () => {
        const day = Date.now()
        const workout = {day, title, exercise: listExercises}
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
            console.log('new workout added', json)
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
                    <button className='confirm-title' onClick={ConfirmTitle}>Confirm Title</button>
            </div>}
            {titleconfirmed === true && <h3>Title: {title}</h3>}
            {titleconfirmed === true && <ExerciseForm exercises={exercises} title={title}/>}
            {titleconfirmed === true && <button onClick={postWorkout}>Add Workout</button>}
            {listExercises.length > 0 && <div>
                <table className="exercise-table">
                    <tr>
                        <th>Exercise Type</th>
                        <th>Exercise Name</th>
                        <th>Rounds x Reps</th>
                        <th>Weight</th>
                        <th>Duration</th>
                        <th>Distance</th>
                        <th>PR</th>
                    </tr>
                    {listExercises && listExercises.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.sets.rounds}x{item.sets.reps}</td>
                            <td>{item.sets.weight}</td>
                            <td>{item.sets.duration}</td>
                            <td>{item.sets.distance}</td>
                            <td>🍔</td>
                        </tr>
                    ))}
                </table>
            </div>}
            
        </div>
    )
}

export default CreateWorkout;