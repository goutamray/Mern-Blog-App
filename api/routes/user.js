
import express from "express";
import { getAllUsers } from "../controllers/userController.js";


// create router 
const router = express.Router();


// routing
router.get("/", getAllUsers); 


// export default router 
export default router;


