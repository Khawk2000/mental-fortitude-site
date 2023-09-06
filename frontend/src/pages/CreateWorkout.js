import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ExerciseForm from '../components/ExerciseForm';


const CreateWorkout = () => {
    const navigate = useNavigate()
    const [exercise, setExercise] = useState(null)
    const [error, setError] = useState(null)
    const [title, setTitle] = useState('')
    const [day, setDay] = useState('')
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
        var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        var currentDate = new Date();
        var datetime = ''
        var dayOfWeek = weekdays[currentDate.getDay()]
        var month = currentDate.getMonth() + 1
        var hours = currentDate.getHours()
        var min = currentDate.getMinutes()
        var timeOfDay = 'am'
        if(hours > 12){
            hours = hours - 12
            timeOfDay = 'pm'
        }
        if(min < 10) {
            datetime = dayOfWeek.toString() + ', ' + month + '/' + 
            currentDate.getDate() + '/' + currentDate.getFullYear() + 
            ' @ ' + hours + ':0' + currentDate.getMinutes() + ' ' + timeOfDay;
        } else {
        datetime = dayOfWeek.toString() + ', ' + month + '/' + 
            currentDate.getDate() + '/' + currentDate.getFullYear() + 
            ' @ ' + hours + ':' + currentDate.getMinutes() + ' ' + timeOfDay;
        }
        setDay(datetime)
    }

    const postWorkout = async () => {
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
            {titleconfirmed === false && <div className='title-creation'>
                    <div className='label-input-container'>
                        <label className='title-label'>Workout Title: </label>
                        <input className='title-input'type='text' onChange={(e) => setTitle(e.target.value)} value={title}/>
                    </div>
                    <div className="confirm-title-button-container">
                        <button className='confirm-title' onClick={ConfirmTitle}>Confirm Title</button>
                    </div>
            </div>}
            {titleconfirmed === true && <h3 className='workout-title'>{title}</h3>}
            {titleconfirmed === true && <ExerciseForm exercises={exercises} title={title}/>}
            {listExercises.length > 0 && <div>
                <table className="exercise-table">
                    <tr>
                        <th>Exercise Type</th>
                        <th>Exercise Name</th>
                        <th>Rounds x Reps</th>
                        <th>Weight</th>
                        <th>Duration(min)</th>
                        <th>Distance(mi)</th>
                        <th>PR</th>
                    </tr>
                    {listExercises && listExercises.map((item, index) => (
                        <tr key={index}>
                            <td>{item.type}</td>
                            <td>{item.name}</td>
                            {item.type === "Lift" && <td>{item.sets.rounds}x{item.sets.reps}</td>}
                            {item.type === "Cardio" && <td></td>}
                            <td>{item.sets.weight}</td>
                            <td>{item.sets.duration}</td>
                            <td>{item.sets.distance}</td>
                            <td>🍔</td>
                        </tr>
                    ))}
                </table>
            </div>}
            {listExercises.length > 0 && <div className="add-workout-container">
                <button className='add-workout-button'onClick={postWorkout}>Add Workout</button>
                </div>}
            
        </div>
    )
}

export default CreateWorkout;