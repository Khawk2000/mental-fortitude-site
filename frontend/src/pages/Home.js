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
    console.log(workouts)

    return (
        <div className="home">
            <div className="workouts">
                {isPending && <h1>Loading...</h1>}
                {!isPending && workouts.length === 0 && <h3 className='no-workouts'>You have no current workouts added...</h3>}
                {workouts && workouts.map((workout) => (
                    <a href='/'><Link to={`/${workout._id}`}>
                        <WorkoutPreview key={workout._id} workout={workout}/>
                    </Link>
                    </a>
                ))}
                {!isPending && <div className="center-button">
                    <a href='/createworkout' className='create-button'>Create Workout</a>
                    </div>}
            </div>
        </div>
    )
}

export default Home;