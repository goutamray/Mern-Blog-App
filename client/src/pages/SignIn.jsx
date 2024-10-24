import { Button, Label, TextInput } from "flowbite-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import createToast from "../utilis/toastify";


const SignIn = () => {
  const [formData, setFormData ] = useState({});
  const [loading, setLoading ] = useState(false); 

  const navigate = useNavigate();
 
  // handle input change 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id] : e.target.value })
  }

  // handle form submit 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    // validation 
    if ( !formData.email || !formData.password ) {
      setLoading(false); 
      return createToast("All fields are Required", );
    }


    try {
      const res = await fetch('/api/auth/signin', {
        method : "POST",
        headers : { "Content-Type" : "application/json"},
        body : JSON.stringify(formData)
      })
      const data = await res.json();
      setLoading(false); 
      createToast("User Login SuccessFull", "success");
      navigate("/");

    } catch (error) {
       setLoading(true); 
       console.log(error.message);
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
                 <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white mr-1"> Goutam </span>
                <span> Blog </span>
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
                  {
                    loading ? <p className="text-sm font-medium"> Login...</p> : "Sign In"
                  }
                    
                </Button>
             </form>
             <div className="flex gap-2 mt-5 text-md ">
               <span>Dont Have an Account </span>
               <Link to="/sign-up" className="text-blue-500">
                  Sign Up
               </Link>
             </div>
           </div>
        </div>

      </div>
    </>
  )
}

export default SignIn
