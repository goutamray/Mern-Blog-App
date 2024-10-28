
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
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';

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
     
        <ScrollToTop />
        {/* Header  */}
        <Header />

          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/about' element={<About />}/>
              <Route path='/projects' element={<Projects />}/>
              
              <Route element={<PrivateRoute />}>
                  <Route path='/dashboard' element={<Dashboard />}/>
              </Route>

              <Route element={<OnlyAdminPrivateRoute />}>
                  <Route path='/create-post' element={<CreatePost />}/>
                  <Route path='/update-post/:postId' element={<UpdatePost />}/>
              </Route>

              <Route path='/sign-up' element={<SignUp />}/>
              <Route path='/sign-in' element={<SignIn />}/>
              <Route path='/post/:postSlug' element={<PostPage />}/>
          </Routes>

          {/* footer */}
          <FooterPart />

     </BrowserRouter>
    </>
  )
}

export default App
