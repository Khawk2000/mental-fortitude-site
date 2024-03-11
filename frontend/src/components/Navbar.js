import { Link } from 'react-router-dom'
import logo from "../MF_Logo.png"
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const [userInfo, setUserInfo] = useState()
    const navigate = useNavigate()
    console.log(user)

    //handles logout button click
    const handleClick = () => {
        logout()
        navigate('/login')
    }
    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await fetch(process.env.BASE_URL + '/api/user',  {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
        
            if (response.ok) {
                setUserInfo(json)
            }
        }
        if (user){
            fetchUserInfo()
        }
        
    }, [user])
    console.log(userInfo)
    
    return (
        <header>
            <div className="container">
                <div className='left-side-nav'>
                    <Link to='/'>
                        <img src={logo} className='App-Logo' alt="MF Logo"/>
                    </Link>
                    <div className='app-name'>
                        <h1>Workout Buddy</h1>
                    </div>
                </div>
                <nav>
                    {user && (<div className='right-side-nav'>
                        <span className='user-login-display'>Welcome Back, {user.firstName}!</span>
                        <button onClick={handleClick}>Logout</button>
                    </div>)}
                    {!user && (<div className='right-side-nav'>
                        <Link to='/login' className='rsnav-item'>Login</Link>
                        <Link to='/signup' className='rsnav-item'>Signup</Link>
                    </div>)}
                </nav>
                
            </div>
        </header>
    )
}

export default Navbar;