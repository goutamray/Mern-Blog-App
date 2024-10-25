import express from "express";
import { signup, signin,  google } from "../controllers/authController.js";


// create router 
const router = express.Router();

// routing
router.post("/signup", signup); 
router.post("/signin", signin); 

router.post("/google", google); 


// export default router 
export default router;

