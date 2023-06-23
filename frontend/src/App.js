import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages & components
import Home from './pages/Home'
import SingleWorkout from './pages/SingleWorkout';
import Navbar from './components/Navbar';
import CreateWorkout from './pages/CreateWorkout';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path='/createworkout'
              element={<CreateWorkout/>}
            />
            <Route 
              path='/:id'
              element={<SingleWorkout/>}
            />
            <Route 
              path='/'
              element={<Home/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
