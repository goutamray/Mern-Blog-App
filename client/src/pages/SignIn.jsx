import {Alert, Spinner, Button, Label, TextInput } from "flowbite-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import createToast from "../utilis/toastify";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux"
import OAuth from "../components/OAuth";
import Logo from "../components/Logo";


const SignIn = () => {
  const [formData, setFormData ] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error: errorMessage } = useSelector((state) => state.user)
 
  // handle input change 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id] : e.target.value })
  }

  // handle form submit 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
   

    // validation 
    if ( !formData.email || !formData.password ) {
      dispatch(signInFailure("Please Fill All The Fields")); 
      return createToast("All fields are Required" );
    }


    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method : "POST",
        headers : { "Content-Type" : "application/json"},
        body : JSON.stringify(formData)
      })
      const data = await res.json();

      // if data is not okay 
      if (data.success === false ) {
         dispatch(signInFailure(data.message))
      }

      // if response is ok 
      if (res.ok) {
          dispatch(signInSuccess(data));
          createToast("User Login SuccessFull", "success");
          navigate("/");
      }
      

    } catch (error) {
        dispatch(signInFailure(error.message))
        createToast("SomeThing Went Wrong");
    }
  }
  
  return (
    <>
       <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col sm:flex-row gap-4 sm:items-center">
           {/* left part */}
           <div className="flex-1">
            <Link to="/" className="text-sm sm:text-2xl font-bold dark:text-white  ">
               <Logo />
             </Link>
             <p className="text-sm mt-5">  This is a demo project. You can sign in with your email and password
             or with Google. </p>

           </div>
         {/* right part */}
           <div className="flex-1">
             <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div>
                  <Label value="Your Email" />
                  <TextInput 
                    type="email"
                    placeholder="Email"
                    id="email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label value="Your Password" />
                  <TextInput 
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                  />
                </div>
                <Button gradientDuoTone="purpleToPink" type="submit"> 
                { loading ? (
                    <>
                      <Spinner size='sm' />
                      <span className='pl-3'>Loading...</span>
                    </>
                    ) : (
                      'Sign In'
                    )
                  }
                </Button>
             </form>
             <OAuth />
             <div className="flex gap-2 mt-5 text-md ">
               <span>Dont Have an Account </span>
               <Link to="/sign-up" className="text-blue-500">
                  Sign Up
               </Link>
             </div>
             { 
              errorMessage && (
               <Alert className='mt-5' color='failure'>
                   {errorMessage}
                </Alert>
               )
              }
           </div>
        </div>

      </div>
    </>
  )
}

export default SignIn
