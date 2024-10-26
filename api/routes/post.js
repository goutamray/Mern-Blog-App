
import express from "express";
import { verifyToken } from "../utilis/verifyToken.js";
import { createPost } from "../controllers/postController.js";



// create router 
const router = express.Router();


router.post("/create", verifyToken, createPost); 



// export default router 
export default router;


