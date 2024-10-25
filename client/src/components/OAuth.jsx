
import { Button } from "flowbite-react"; 
import { FaGoogle } from "react-icons/fa";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { fireBaseApp } from "../firebase";
import { useDispatch } from "react-redux";
// import createToast from "../utilis/toastify";
import { useNavigate } from "react-router-dom";

import { signInSuccess } from "../redux/user/userSlice";

const OAuth = () => {
  const auth = getAuth(fireBaseApp)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  // handle google login 
  const handleGoogleClick = async () =>{
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
        const resultsFromGoogle = await signInWithPopup(auth, provider)
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL,
            }),
            })
        const data = await res.json()
        if (res.ok){
            dispatch(signInSuccess(data))
            navigate('/')
        }
    } catch (error) {
        console.log(error);
    }
} 


  return (
    <>
      <Button 
         type="button" 
         className="w-full mt-3 flex gap-2 items-center text-xl " gradientDuoTone="pinkToOrange"
         outline
         onClick={handleGoogleClick}
        >
          <FaGoogle className="h-6 w-6 mr-1"/>
          Continue With Google 
      </Button>
    </>
  )
}

export default OAuth




