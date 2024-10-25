
import express from "express";
import { getAllUsers, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utilis/verifyToken.js";


// create router 
const router = express.Router();


// routing
router.get("/", getAllUsers); 
router.patch("/update/:userId", verifyToken, updateUser); 


// export default router 
export default router;


