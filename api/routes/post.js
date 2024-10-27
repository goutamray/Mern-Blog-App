
import express from "express";
import { verifyToken } from "../utilis/verifyToken.js";
import { createPost, getAllPosts, deletePost, updatePost } from "../controllers/postController.js";


// create router 
const router = express.Router();

router.post("/create", verifyToken, createPost); 
router.get("/getposts", getAllPosts); 
router.delete("/deletepost/:postId/:userId", verifyToken, deletePost); 
router.put("/updatepost/:postId/:userId", verifyToken, updatePost); 


// export default router 
export default router;


