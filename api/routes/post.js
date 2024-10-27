
import express from "express";
import { verifyToken } from "../utilis/verifyToken.js";
import { createPost, getAllPosts } from "../controllers/postController.js";


// create router 
const router = express.Router();


router.post("/create", verifyToken, createPost); 
router.get("/getposts", getAllPosts); 


// export default router 
export default router;


