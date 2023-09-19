import { Link } from 'react-router-dom'
import logo from "C:/Users/keegm/Workspaces/mental-fortitude-site/frontend/src/MF_Logo.png"
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    //handles logout button click
    const handleClick = () => {
        logout()
        navigate('/login')
    }
    
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
                        <span className='user-login-display'>Welcome Back, {user.email}!</span>
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