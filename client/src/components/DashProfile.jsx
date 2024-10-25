import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"; 
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { fireBaseApp } from "../firebase";

// progress css 
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile ] = useState(null);
  const [imageFileUrl, setImageFileUrl ] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress ] = useState(null);
  const [imageFileUploadError, setImageFileUploadError ] = useState(null);

  console.log(imageFileUploadProgress, imageFileUploadError);
  

  const filePickerRef = useRef(); 

  // handle image change 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); 
    }
   
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);


  const uploadImage = () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read; 
    //       allow write: if 
    //       request.resource.size < 5 * 1024 * 1024 && 
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
   setImageFileUploadError(null);

   const storage = getStorage(fireBaseApp); 
   const fileName = new Date().getTime() + imageFile.name;
   const storageRef = ref(storage, fileName);
   const uploadTask = uploadBytesResumable(storageRef, imageFile);

   uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
      setImageFileUploadProgress(progress.toFixed(0)); 
    },
    (error) => {
      setImageFileUploadError('Could not upload image (File must be less then 5MB)' );
      setImageFileUploadProgress(null); 
      setImageFileUrl(null);
      setImageFile(null); 
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           setImageFileUrl(downloadURL)
      })
    }
   )

  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full "> 
      <h2 className="text-center text-3xl font-semibold mb-5 mt-5"> Profile </h2>
      <form className="flex flex-col gap-4" >
           <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              ref={filePickerRef}
              hidden
            />
        <div 
          className="h-32 w-32 self-center cursor-pointer shadow-md rounded-full relative" 
          onClick={() => filePickerRef.current.click()}
          >
            {
              imageFileUploadProgress && (
                <CircularProgressbar 
                   value={ imageFileUploadProgress || 0 } 
                   text={`${imageFileUploadProgress}%`}
                   strokeWidth={5}
                   styles={{
                    root : {
                      width : "100%",
                      height : "100%",
                      position : "absolute",
                      top : 0,
                      left : 0, 
                    },
                    path : {
                      stroke : `rgba(62, 152, 199 , ${imageFileUploadProgress / 100 })`
                    }

                   }}
                  />
              )
            }
           <img 
             src={imageFileUrl || currentUser.photo} 
             alt="user-photo" 
             className={`rounded-full object-cover h-full w-full border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress <100 && "opacity-60"}`}
            />
        </div>
        {
          imageFileUploadError && <Alert color="failure"> { imageFileUploadError } </Alert>
        }
          <TextInput 
              type="text"
              placeholder="Username"
              id="name"
              defaultValue={currentUser.name}
              // onChange={handleChange}
            />
           <TextInput 
              type="email"
              placeholder="Email"
              id="email"
              defaultValue={currentUser.email}
              // onChange={handleChange}
            />
            <TextInput 
              type="password"
              placeholder="Password"
              id="password"
              defaultValue={currentUser.password}
              // onChange={handleChange}
            />
          <Button gradientDuoTone="purpleToBlue" type="submit" outline> 
             Update    
          </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer text-md font-semibold"> Delete Account </span>
        <span className="cursor-pointer text-md font-semibold"> Sign Out </span>
      </div>
    </div>
  )
}

export default DashProfile


