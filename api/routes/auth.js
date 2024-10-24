import express from "express";
import { signup } from "../controllers/authController.js";


// create router 
const router = express.Router();


// routing
router.post("/signup", signup); 


// export default router 
export default router;

