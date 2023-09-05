import { useState } from "react";

const ExerciseForm = ({ exercises, title }) => {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [rounds, setRounds] = useState('')
    const [duration, setDuration] = useState('')
    const [distance, setDistance] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')

    const handleClick = (e) => {
        e.preventDefault()
        if (type === '' || name === '') {
            alert('Type and Name are both required fields for each exercise')
        } else {
            let sets = { rounds, duration, distance, reps, weight }
            let data = { type, name, sets }
            exercises(data)
            setType('')
            setName('')
            setRounds('')
            setDuration('')
            setDistance('')
            setReps('')
            setWeight('')
            alert("Exercise added to workout, add more if you need")
        }
        
    }


    //Maybe when exercise is added, display it in a table below for reference similar to the one in SingleWorkout.js

    return (
        <div className="exercise-form">
            <form className="create">
                <div className="eform-table">
                    <div className="first-col-eform">
                        <label>Type of Exercise (Lift, Cardio): </label>
                        <select name='exercise-type' id='exercise-type' onChange={(e) => setType(e.target.value)}>
                            <option value='Choose' selected disabled>Choose one...</option>
                            <option value='Lift'>Lift</option>
                            <option value='Cardio'>Cardio</option>
                        </select>
                        {type === "Cardio" && <label>Duration of exercise in minutes: </label>}
                        {type === "Cardio" && <input
                            type="number"
                            onChange={(e) => setDuration(e.target.value)}
                            value={duration}
                        />} 
                        
                        {type === "Lift" && <label>Number of Rounds for Exercise: </label>}
                        {type === "Lift" &&
                        <input type="number"
                            onChange={(e) => setRounds(e.target.value)}
                            value={rounds}
                        />}


                        {type === "Lift" && <label>Weight for exercise: </label>}
                        {type ==="Lift" &&
                        <input
                            type="number"
                            onChange={(e) => setWeight(e.target.value)}
                            value={weight}
                        />}
                    </div>
                    <div className="second-col-eform">
                        <label>Name of Exercise: </label>
                        <input
                            required
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />

                        {type === "Cardio" && <label>Distance for exercise in miles: </label>}
                        {type === "Cardio" && <input
                            type="number"
                            onChange={(e) => setDistance(e.target.value)}
                            value={distance}
                        />} 
                        
                        {type === "Lift" && <label>Reps for exercise: </label>}
                        {type ==="Lift" &&
                        <input
                            type="number"
                            onChange={(e) => setReps(e.target.value)}
                            value={reps}
                        />}
                    </div>
                </div>
                <div className="add-exercise-container">
                    <button className='add-exercise-button' onClick={handleClick}>Add Exercise</button>
                </div>
            </form>
        </div>
    )
}
export default ExerciseForm;