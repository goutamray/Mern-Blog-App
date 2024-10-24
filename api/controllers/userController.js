import User from "../models/User.js";
import asyncHandler from "express-async-handler"; 

/**
 * @DESC GET ALL USER 
 * @METHOD GET
 * @ROUTE /api/v1/user
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












