import User from "../models/User.js";
import asyncHandler from "express-async-handler"; 
import bcryptjs from "bcryptjs";


/**
 * @DESC GET ALL USER 
 * @METHOD POST
 * @ROUTE /api/user/signup
 * @ACCESS PUBLIC 
 * 
 */
export const signup = asyncHandler(async(req, res) => {
  const { name, email, password } = req.body; 

// validation 
if (!name || !email || !password) {
  return res.status(400).json({ users : "", message : "All fileds are required"});
};

// pasword hash 
const hashedPassword = bcryptjs.hashSync(password, 10); 

const newUser = new User({ name, email, password : hashedPassword });

await newUser.save();

return res.json({ newUser, message : "Signup SuccessFull"})
});  






