
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import './App.css'

// pages 
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'

// components
import Header from './components/Header';
import FooterPart from './components/FooterPart';

function App() {
  return (
    <>

      <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />

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

          {/* footer */}
          <FooterPart />

     </BrowserRouter>
    </>
  )
}

export default App
