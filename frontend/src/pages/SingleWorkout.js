import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../hooks/useAuthContext';



//components
import WorkoutDetails from '../components/WorkoutDetails'

const BASE = "https://mental-fortitude-site.onrender.com"

//Displaying single workout page
const SingleWorkout = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [isPending, setIsPending] = useState(true)
    const [workout, setWorkout] = useState(null)
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch(BASE + '/api/workouts/' + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setWorkout(json)
                setIsPending(false)
            }
        }
        fetchWorkout()
    }, [id, user])

    const handleDelete = async () =>{
        if(!user){
            return
        }
            const response = await fetch(BASE + 'api/workouts/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
    
            if (response.ok){
                console.log(json)
                navigate('/')
            }

    }

    const handleEdit = () => {
        navigate(`/edit/${id}`)
    }

    const handleHome = () =>{
        navigate('/')
    }
    return (
        <div className="single-workout">
            <div className="details-container">
                {isPending && <h1>Loading...</h1>}
                {workout && <div>
                    <WorkoutDetails workout={workout}/>
                    </div>}
                {workout && <div className="center-button">
                    <button className='home-button' onClick={handleHome}><FontAwesomeIcon icon={faHouse} /><span className='text-from-icon'>Home</span></button>
                    <button className='edit-workout-button' onClick={handleEdit}><FontAwesomeIcon icon={faPencil}/><span className='text-from-icon'>Edit</span></button>
                    <button className="delete-workout" onClick={handleDelete}><FontAwesomeIcon icon={faTrash}/><span className='text-from-icon'>Delete</span></button>
                    </div>}
            </div>
        </div>
    )
}

export default SingleWorkout;