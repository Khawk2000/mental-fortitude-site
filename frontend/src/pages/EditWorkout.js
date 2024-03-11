import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCheck} from '@fortawesome/free-solid-svg-icons'
import EditSets from '../components/EditSets';

var usedNums = []


//FIX!!! ISSUES WITH EDITING EXERCISES WITH MORE THAN ONE SET, DELETES ALL OTHER SETS BUT LAST ONE

const EditWorkout = () => {
    const [workout, setWorkout] = useState(null)
    const { id } = useParams()
    const {user} = useAuthContext()
    const [title, setTitle] = useState(null)
    const [sets, setSets] = useState([])
    const [editDT, setEditDT] = useState(true)
    const [editDur, setEditDur] = useState(null)
    const [editDis, setEditDis] = useState(null)
    const [durChange, setDurChange] = useState(false)
    const [disChange, setDisChange] = useState(false)
    const [editExercise, setEditExercise] = useState(false)
    const [doneEdits, setDoneEdits] = useState(false)
    const navigate = useNavigate()
    const [index, setIndex] = useState(0)
    const [editedExercises, setEditedExercises] = useState([])

    var numSets = []
   
    const BASE = "https://mental-fortitude-site.onrender.com"

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch(BASE + '/api/workouts/' + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                setWorkout(json)
            }
            if(!response.ok){
                console.log(json.error)
            }
        }
        fetchWorkout()
        console.log(editedExercises)
    }, [id, user, editedExercises])

    const handleEdit = async () => {
        if(!user){
            console.log('user issue')
            return
        }else{
        console.log(editedExercises)
        const editWorkout = {day:workout.day, title:title, exercise:editedExercises}
        console.log(editWorkout)
            const response = await fetch(BASE + '/api/workouts/' + id, {
                method: 'PATCH',
                body: JSON.stringify(editWorkout),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(!response.ok){
                console.log(json.error)
            }
            if(response.ok){
                console.log(json)
                console.log('Updated workout' + workout.title)
                navigate('/')
            }
        }
            
    }

    const handleHome = () =>{
        navigate('/')
    }
    
    const confirmTitle = () => {
        setEditDT(false)
        setEditExercise(true)
        if(title === null){
            setTitle(workout.title)
        }
    }


    const getEditSets = (data, num) => {
        if(usedNums.includes(num)){
            console.log('is in nums')
            const nextEdits = sets.map((d, i) => {
                if(i === num){
                    return data
                }else if(i < num){
                    return console.log('tried to add more sets')
                }else{
                    return d
                }
            })
            setSets(nextEdits)
        }else{
            console.log('not in nums')
            usedNums.push(num)
            console.log(usedNums)
            console.log(data)
            setSets([...sets, data])

        }
    }

    const sendEditSets = (num) => {
        for(let i=0; i<num; i++){
            numSets.push(<EditSets getEditSets={getEditSets} currSets={workout.exercise[index].sets} num={i}/>)
        }
        return numSets
    }

    const changeIndex = () => {
        if(!durChange){
            setEditDur(workout.exercise[index].duration)
        }
        if(!disChange){
            setEditDis(workout.exercise[index].distance)
        }
        const editedExercise = {type:workout.exercise[index].type, name:workout.exercise[index].name, duration:editDur, distance:editDis, sets:sets}
        setEditedExercises([...editedExercises, editedExercise])
        setSets([])
        usedNums = []
        if(index < workout.exercise.length-1){
            setIndex(index+1)
        }else {
            setEditExercise(false)
            setDoneEdits(true)
        }
    }

    return (
        <div className='edit-workout'>
            <div className='edit-container'>
                {workout && 
                    <div>
                        {editDT && 
                        <div className='edit-title-container'>
                            <div className='label-input-container'>
                                <h2>Current Workout Title: {workout.title}</h2>
                                <label className='title-label'>New Title: </label>
                                <div className='new-title-line'>
                                    <input className='title-input' type='text' onChange={(e) => setTitle(e.target.value)} value={title}/>
                                    <button onClick={confirmTitle} className='confirm-title-button'>Confirm Title</button>
                                </div>
                            </div>
                        </div>
                        }
                        {!editDT && <h1>New Workout Title: {title}</h1>}
                        {editExercise && 
                            <div className='edit-sets-container'>
                                <h3>Edit Exercise #{index+1}: {workout.exercise[index].name}</h3>
                                {workout.exercise[index].type === "Lift" && sendEditSets(workout.exercise[index].sets.length)}
                                {workout.exercise[index].type === "Cardio" && 
                                    <div>
                                        <label className='duration-label'>Duration: </label>
                                        <input
                                            placeholder={workout.exercise[index].duration}
                                            type='number'
                                            onChange={(e) => {
                                                setEditDur(e.target.value)
                                                setDurChange(true)
                                            }}
                                        />
                                        <label className='distance-label'>Distance: </label>
                                        <input
                                            placeholder={workout.exercise[index].distance}
                                            type='number'
                                            onChange={(e) => {
                                                setEditDis(e.target.value)
                                                setDisChange(true)
                                            }}
                                        />
                                    </div>
                                }
                                <div className='confirm-edits-button-wrap'>
                                    <button className='confirm-edits-button'onClick={changeIndex}><FontAwesomeIcon icon={faCheck}/><span className='text-from-icon'>Confirm Edits to Exercise #{index+1}</span></button>
                                </div>
                           </div>
                        }
                        
                    </div>
            }   
                <div className='done-edits-wrap'>
                    {doneEdits && <h2>Done with all edits</h2>}
                    {doneEdits && <button className='submit-edit' onClick={handleEdit}><FontAwesomeIcon icon={faCheck}/><span className='text-from-icon'>Submit Edits</span></button>}
                </div>
                <div className='home-button-wrap'>
                    <button className='home-button' onClick={handleHome}><FontAwesomeIcon icon={faHouse} /><span className='text-from-icon'>Home</span></button>
                </div>
                
            </div>
        </div>

    )
    /*const navigate = useNavigate()
    const [listExercises, setListExercises] = useState([])

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch('/api/workouts/' + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                //setWorkout(json)
                //setIsPending(false)
            }
        }
        fetchWorkout()
    }, [id, user])
    //keeps track of exercises in entire workout and updates the table on createworkouts accordingly

    //Update workout to database
    const patchWorkout = async () => {
        if(!user){
            setError('You must be logged in')
            console.log(error)
            return
        }
        const workout = {day, title, exercise: listExercises}
        console.log(workout)
        const response = await fetch('api/workouts/createworkout/', {
            method: 'PATCH',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
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

    //function to get exercises from ExerciseForm
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
                <h3 className='workout-title'>{title}</h3>
                <ExerciseForm exercises={exercises} title={title}/>
            {listExercises.length > 0 && <div>
                <table className="exercise-table">
                    <tr>
                        <th>Exercise Type</th>
                        <th>Exercise Name</th>
                        <th>Number of Sets</th>
                        <th>Reps x Weight</th>
                        <th>Duration(min)</th>
                        <th>Distance(mi)</th>
                        <th>PR</th>
                    </tr>
                    {listExercises && listExercises.map((item, index) => (
                        <tr key={index}>
                            <td>{item.type}</td>
                            <td>{item.name}</td>
                            {item.type === "Lift" && <td>{item.sets.length}</td>}
                            {item.type === "Lift" && 
                                <td>
                                    {item.sets.map(function(subsets, id){
                                        if(item.sets[id] === undefined){
                                            return console.log()
                                        }else{
                                            return <div>{item.sets[id].rep}x{item.sets[id].weight}</div>
                                        }
                                    })}
                                </td>}
                            {item.type === "Cardio" && <td>-</td>}
                            {item.type === "Cardio" && <td>-</td>}
                            {item.type === "Lift" && <td>-</td>}
                            {item.type === "Lift" && <td>-</td>}
                            
                            {item.type === "Cardio" && <td>{item.duration}</td>}
                            {item.type === "Cardio" && <td>{item.distance}</td>}
                            <td>🍔</td>
                        </tr>
                    ))}
                </table>
            </div>}
            {listExercises.length > 0 && <div className="add-workout-container">
                <button className='add-workout-button'onClick={patchWorkout}>Add Workout</button>
                </div>}
            
        </div>
    )*/
}

export default EditWorkout;