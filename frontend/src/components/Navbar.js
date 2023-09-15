import { Link } from 'react-router-dom'
import logo from "C:/Users/keegm/Workspaces/mental-fortitude-site/frontend/src/MF_Logo.png"
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleClick = () => {
        logout()
        navigate('/login')
    }
    
    return (
        <header>
            <div className="container">
                <Link to='/'>
                    <img src={logo} className='App-Logo' alt="MF Logo"/>
                </Link>
                <h1>Workout Buddy</h1>
                <nav>
                    {user && (<div>
                        <span className='user-login-display'>Welcome Back, {user.email}!</span>
                        <button onClick={handleClick}>Log out</button>
                    </div>)}
                    {!user && (<div>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Sign up</Link>
                    </div>)}
                </nav>
                
            </div>
        </header>
    )
}

export default Navbar;