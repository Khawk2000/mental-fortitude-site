import { Link } from 'react-router-dom'
import logo from "C:/Users/keegm/Workspaces/mental-fortitude-site/frontend/src/MF_Logo.png"


const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to='/'>
                    <img src={logo} className='App-Logo' alt="MF Logo"/>
                </Link>
                <h1>Workout Buddy</h1>
                
            </div>
        </header>
    )
}

export default Navbar;