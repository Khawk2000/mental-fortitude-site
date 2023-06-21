import { useEffect, useState } from 'react'

//components
import WorkoutPreview from '../components/WorkoutPreview'
import { Link } from 'react-router-dom'

const Home = () => {

    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()
        
            if (response.ok) {
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [])

    return (
        <div className="home">
            <div className="workouts">
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