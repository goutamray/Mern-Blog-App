
import express from "express";
import { createComment, getPostComments, likeComment } from "../controllers/commentController.js";
import { verifyToken } from "../utilis/verifyToken.js";

// create router 
const router = express.Router();

// routing
router.post("/create", verifyToken, createComment); 
router.get("/getPostComments/:postId", getPostComments); 
router.patch("/likeComment/:commentId", verifyToken, likeComment )

// export default router 
export default router;



