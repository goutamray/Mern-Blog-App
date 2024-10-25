import User from "../models/User.js";
import asyncHandler from "express-async-handler"; 
import bcryptjs from "bcryptjs";


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
   // Check for valid user ID
   if (req.user.id !== req.params.userId) {
     return res.status(400).json({ message: "User ID not found" });
   }
 
   // Password validation and hashing
   if (req.body.password) {
     if (req.body.password.length < 6) {
       return res.status(400).json({ message: "Password must be at least 6 characters" });
     }
     req.body.password = bcryptjs.hashSync(req.body.password, 10);
   }
 
   // Name validation
   if (req.body.name) {
     if (req.body.name.length < 5 || req.body.name.length > 30) {
       return res.status(400).json({ message: "User name must be between 5 and 30 characters" });
     }
   }
 
   try {
     // Attempt to find and update the user
     const updatedUser = await User.findByIdAndUpdate(
       req.params.userId,
       {
         $set: {
           name: req.body.name,
           email: req.body.email,
           photo: req.body.photo,
           ...(req.body.password && { password: req.body.password }),
         },
       },
       { new: true }
     );
 
     // If user not found, return 404
     if (!updatedUser) {
       console.error("User not found with ID:", req.params.userId);
       return res.status(404).json({ message: "User not found" });
     }
 
     // Omit the password from the response
     const { password, ...rest } = updatedUser._doc;
 
     return res.status(200).json(rest);
 
   } catch (error) {
     console.error("Error updating user:", error.message);
     return res.status(500).json({ message: "An error occurred while updating the user." });
   }
 });

 
