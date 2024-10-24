
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'

function App() {
  return (
    <>
     <BrowserRouter>
        {/* Header  */}
        <Header />

          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/about' element={<About />}/>
              <Route path='/projects' element={<Projects />}/>
              <Route path='/dashboard' element={<Dashboard />}/>
              <Route path='/sign-up' element={<SignUp />}/>
              <Route path='/sign-in' element={<SignIn />}/>
          </Routes>
          
     </BrowserRouter>
    </>
  )
}

export default App
