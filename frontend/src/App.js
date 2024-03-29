import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
//pages & components
import Home from './pages/Home'
import SingleWorkout from './pages/SingleWorkout';
import Navbar from './components/Navbar';
import CreateWorkout from './pages/CreateWorkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EditWorkout from './pages/EditWorkout'
import { useLogout } from './hooks/useLogout';

//added conditional loading if user is signed in or not
function App() {
  const {user} = useAuthContext()
  const { logout } = useLogout()
  // Fix the issue when create workout is pressed page reloads and logs out
  async function inactiveLogout() {
    setTimeout(() => {
      logout()
    }, 3600000)
  }

  inactiveLogout();
  /*window.addEventListener("beforeunload", (ev) => {
      logout()
    }
  )*/
  return (
    <div className="App">
      <title>Testing</title>
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route 
              path='/login'
              element={!user ? <Login/> : <Navigate to='/'/>}
            />
            <Route 
              path='/signup'
              element={!user ? <Signup/> : <Navigate to='/'/>}
            />
            <Route
              path='/createworkout'
              element={<CreateWorkout/>}
            />
            <Route 
              path='/:id'
              element={<SingleWorkout/>}
            />
            <Route
              path='/edit/:id'
              element={<EditWorkout/>}
            />
            <Route 
              path='/'
              element={user ? <Home/> : <Navigate to='/login'/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
