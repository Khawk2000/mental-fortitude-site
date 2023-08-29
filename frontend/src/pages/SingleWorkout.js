import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//components
import WorkoutDetails from '../components/WorkoutDetails'

const SingleWorkout = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [isPending, setIsPending] = useState(true)
    const [workout, setWorkout] = useState(null)

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch('/api/workouts/' + id)
            const json = await response.json()
            if (response.ok) {
                setWorkout(json)
                setIsPending(false)
            }
        }
        fetchWorkout()
    }, [id])

    const handleDelete = async () =>{
            const response = await fetch('api/workouts/' + id, {
                method: 'DELETE'
            })
            const json = await response.json()
    
            if (response.ok){
                console.log(json)
                navigate('/')
            }

    }
    return (
        <div className="single-workout">
            <div className="details-container">
                {isPending && <h1>Loading...</h1>}
                {workout && <WorkoutDetails workout={workout}/>}
                {workout && <div className="center-button">
                    <button className="delete-workout" onClick={handleDelete}>Delete 🗑️</button>
                    </div>}
            </div>
        </div>
    )
}

export default SingleWorkout;