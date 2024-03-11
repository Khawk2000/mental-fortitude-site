import { useEffect, useState } from 'react'

//components
import WorkoutPreview from '../components/WorkoutPreview'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const BASE = "https://mental-fortitude-site.onrender.com"

//Home page
const Home = () => {
    const [workouts, setWorkouts] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const {user} = useAuthContext()
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(BASE + '/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
        
            if (response.ok) {
                setWorkouts(json)
                setIsPending(false)
            }
        }
        if (user){
            fetchWorkouts()
        }
        
    }, [user])
    console.log(workouts)

    return (
        <div className="home">
            <div className="workouts">
                {isPending && user && <h1>Loading...</h1>}
                {!isPending && workouts.length === 0 && <h3 className='no-workouts'>You have no current workouts added...</h3>}
                {workouts && workouts.map((workout) => (
                    <a href='/'><Link to={`/${workout._id}`}>
                        <WorkoutPreview key={workout._id} workout={workout}/>
                    </Link>
                    </a>
                ))}
                <div className="center-button">
                    <a href='/createworkout' className='create-button'>Create Workout</a>
                </div>
            </div>
        </div>
    )
}

export default Home;