import { useState } from "react";

import SetsForm from '../components/SetsForm';

//Array used for keeping track of sets ids


const ExerciseForm = ({ exercises, title }) => {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [rounds, setRounds] = useState('')
    const [duration, setDuration] = useState('')
    const [distance, setDistance] = useState('')
    const [hours, setHours] = useState('')
    const [min, setMin] = useState('')
    const [sets, setSets] = useState([])


    //keeps track of number of sets needed to generate based on number in rounds field
    var numSets = []

    var usedNums = []
    //function to get data from SetsForm with id(num)


    const getSets = (data, num) => {
        if(usedNums.includes(num)){
            const nextSets = sets.map((d, i) => {
                if(i === num){
                    return data
                } else{
                    return d
                }
            })
            setSets(nextSets)
        } else {
            usedNums.push(num)
            setSets([...sets, data])
        }

    }

    //handle click of add exercise button
    //instead of alert have an alert message that looks better and is bigger
    const handleClick = (e) => {
        e.preventDefault()
        if (type === '' || name === '') {
            alert('Type and Name are both required fields for each exercise')
        } else {
            let data = { type, name, duration, distance, sets }
            exercises(data)
            setSets([])
            setType('')
            setName('')
            setRounds('')
            setDuration('')
            setDistance('')
            setMin('')
            setHours('')
            var selectBox = document.getElementById('exercise-type');
            selectBox.selectedIndex = 0
            alert("Exercise added to workout, add more if you need")
        }   
    }

    //creates the correct number of SetsForms and passes the getSets function to children
    const sendSets = (rounds) => {
        for(let i=0; i<rounds; i++){
            numSets.push(<SetsForm getSets={getSets} num={i}/>)
        }
        return numSets
    }


    return (
        <div className="exercise-form">
            <form className="create">
                <div className="eform-table">
                    <div className="eform-row">
                        <div className="eform-col-1">
                            <div><label>Type of Exercise (Lift, Cardio): </label></div>
                            <div><select name='exercise-type' id='exercise-type' onChange={(e) => setType(e.target.value)}>
                                <option value='Choose' selected disabled>Choose one...</option>
                                <option value='Lift'>Lift</option>
                                <option value='Cardio'>Cardio</option>
                            </select>
                            </div>
                        </div>
                        <div className="eform-col-2">
                            <label>Name of Exercise: </label>
                            <input
                                required
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                    </div>
                    <div className="eform-row">
                        <div className="eform-col-1">
                            {type === "Cardio" && <label>Duration of exercise (hours): </label>}
                            {type === "Cardio" && <input
                                type="number"
                                onChange={(e) => setHours(e.target.value)}
                                value={hours}
                            />} 
                            {type === "Cardio" && <label>Duration of exercise (minutes): </label>}
                            {type === "Cardio" && <input
                                type="number"
                                onChange={(e) => {setMin(e.target.value)
                                setDuration(Number(e.target.value) + (hours * 60))
                            }}
                                value={min}
                            />} 
                        </div>
                        <div className="eform-col-2">
                            {type === "Cardio" && <label>Distance for exercise in miles: </label>}
                            {type === "Cardio" && <input
                                type="number"
                                onChange={(e) => setDistance(e.target.value)}
                                value={distance}
                            />} 
                        </div>
                    </div>
                    <div className="eform-row">
                        <div className="eform-col-1">
                            {type === "Lift" && <label>Number of Sets for Exercise: </label>}
                            {type === "Lift" &&
                            <input type="number"
                                min={1}
                                onChange={(e) => setRounds(e.target.value)}
                                value={rounds}
                            />}
                        </div>
                    </div>
                <div className="sets-table">
                    {rounds > 0 && sendSets(rounds)}
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