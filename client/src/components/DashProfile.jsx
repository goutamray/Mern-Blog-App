
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { fireBaseApp } from "../firebase";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

// Progress bar CSS
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutSuccess } from "../redux/user/userSlice";

import createToast from "../utilis/toastify";
import { Link } from "react-router-dom"

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(currentUser.photo || null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const [formData, setFormData] = useState({
    name: currentUser.name || "",
    email: currentUser.email || "",
    photo: currentUser.photo || ""
  });


  const [showModal, setShowModal ] = useState(false); 
  

  const filePickerRef = useRef();
  const dispatch = useDispatch();

  // Handle image change
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

  // Image upload function
  const uploadImage = () => {
    setImageFileUploadError(null);
    const storage = getStorage(fireBaseApp);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be less than 5MB)');
        setImageFileUploadProgress(null);
        setImageFileUrl(null);
        setImageFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData((prevData) => ({ ...prevData, photo: downloadURL })); // Ensure photo is updated in formData
        });
      }
    );
};


  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data.updatedUser));
        createToast("User Updated Successfully", "success");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };



  // delete user account 
  const handleDeleteUser = async() => {
    setShowModal(false);

    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method : "DELETE"
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message))
      }else{
        dispatch(deleteUserSuccess(data))
      }

    } catch (error) {
       dispatch(deleteUserFailure(error.message))
    }
  }


  // user sign out 
  const handleUserSignout = async() => {
    try {
      const res = await fetch("/api/user/signout", {
        method : "POST"
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      }else{
         dispatch(signOutSuccess());
         createToast("Sign Out SuccessFull", "success"); 
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }


  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h2 className="text-center text-3xl font-semibold mb-5 mt-5">Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`
                }
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.photo}
            alt="user-photo"
            className={`rounded-full object-cover h-full w-full border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && "opacity-60"}`}
          />
        </div>
        {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}
        <TextInput
          type="text"
          placeholder="Username"
          id="name"
          defaultValue={currentUser.name}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <Button gradientDuoTone="purpleToBlue" type="submit" outline>
          Update
        </Button>
        {
          currentUser.isAdmin && (
            <Link to="/create-post"> 
              <Button 
                type="button"
                gradientDuoTone="purpleToPink"
                className="capitalize w-full"
              >
               Create a post 
              </Button>
            </Link>
          )
        }
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span 
           onClick={() => setShowModal(true)} 
           className="cursor-pointer text-md font-semibold"
           >
            Delete Account
        </span>
        <span 
          className="cursor-pointer text-md font-semibold"
          onClick={handleUserSignout}
          >
            Sign Out
        </span>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
          <Modal.Header />
          <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal> 

    </div>
  );
};

export default DashProfile;



