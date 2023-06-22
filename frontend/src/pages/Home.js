import { useEffect, useState } from 'react'

//components
import WorkoutPreview from '../components/WorkoutPreview'
import { Link } from 'react-router-dom'

const Home = () => {

    const [workouts, setWorkouts] = useState(null)
    const [isPending, setIsPending] = useState(true)
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()
        
            if (response.ok) {
                setWorkouts(json)
                setIsPending(false)
            }
        }

        fetchWorkouts()
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {isPending && <h1>Loading...</h1>}
                {workouts && workouts.map((workout) => (
                    <Link to={`/${workout._id}`}>
                        <WorkoutPreview key={workout._id} workout={workout}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home;