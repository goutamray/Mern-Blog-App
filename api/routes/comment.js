
import express from "express";
import { createComment } from "../controllers/commentController.js";
import { verifyToken } from "../utilis/verifyToken.js";

// create router 
const router = express.Router();

// routing
router.post("/create", verifyToken, createComment); 


// export default router 
export default router;



