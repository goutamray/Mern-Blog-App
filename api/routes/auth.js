import express from "express";
import { signup, signin } from "../controllers/authController.js";


// create router 
const router = express.Router();


// routing
router.post("/signup", signup); 
router.post("/signin", signin); 


// export default router 
export default router;

