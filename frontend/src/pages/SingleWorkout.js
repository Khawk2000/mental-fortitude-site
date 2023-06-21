import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//components
import WorkoutDetails from '../components/WorkoutDetails'

const SingleWorkout = () => {

    const { id } = useParams()

    const [workout, setWorkout] = useState(null)

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch('/api/workouts/' + id)
            const json = await response.json()
            if (response.ok) {
                setWorkout(json)
            }
        }
        fetchWorkout()
    }, [id])

    return (
        <div className="single-workout">
            <div className="workout-details">
                {workout && <WorkoutDetails workout={workout}/>}
            </div>
        </div>
    )
}

export default SingleWorkout;