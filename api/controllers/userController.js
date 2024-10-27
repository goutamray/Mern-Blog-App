import User from "../models/User.js";
import asyncHandler from "express-async-handler"; 
import jwt from "jsonwebtoken"
import { fileUploadToCloud } from "../utilis/cloudinary.js";


/**
 * @DESC GET ALL USER 
 * @METHOD GET
 * @ROUTE /api/user
 * @ACCESS PUBLIC 
 * 
 */
export const getAllUsers = asyncHandler(async(req, res) => {
  // get all users 
   const users = await User.find(); 
     
  // check users data 
  if ( !users) {
     return res.status(404).json({ users : "", message : "Users Not Found"});
  }; 

 res.status(200).json({ users, message : "All users data"});
});  

/**
 * @DESC UPDATE USER 
 * @METHOD PATCH
 * @ROUTE /api/user/update/:id
 * @ACCESS PUBLIC 
 * 
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle photo upload if a new file is provided
    let filedata = existingUser.photo;
    if (req.file) {
      console.log("File received for upload:", req.file); // Debug log
      const data = await fileUploadToCloud(req.file.path);
      filedata = data.secure_url;
      console.log("Uploaded photo URL:", filedata); // Debug log
    }

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: name || existingUser.name,
        email: email || existingUser.email,
        photo: filedata,
      },
      { new: true }
    );

    // Generate a new JWT with updated user info
    const newToken = jwt.sign(
      {
        id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        photo: updatedUser.photo,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Send updated user and new token as a response
    res
      .cookie("access_token", newToken, { httpOnly: false, secure: false })
      .status(200)
      .json({ updatedUser, token: newToken, message: "User data updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error); // Debug log
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


/**
 * @DESC DELETE USER 
 * @METHOD PATCH
 * @ROUTE /api/user/delete/:id
 * @ACCESS PUBLIC 
 * 
 */
  export const deleteUser = asyncHandler(async(req, res) => {
    // get params 
    const { id } = req.params;
 
    // delete user data 
    const user = await User.findByIdAndDelete(id);
 
    // delete cloud file
     await fileDeleteFromCloud(findPublicId(user.photo));  
 
    // response  
    res.status(200).json({ user, message : "User deleted successfull"});
 });  



 
/**
 * @DESC SIGNOUT USER 
 * @METHOD POST
 * @ROUTE /api/user/signout
 * @ACCESS PUBLIC 
 * 
 */
export const signOutUser = asyncHandler(async(req, res) => {
   try {
     res.clearCookie("access_token");
     return res.status(200).json({ message : "User sign out Successfull"})
   } catch (error) {
     console.log(error.message);
   }
}); 

