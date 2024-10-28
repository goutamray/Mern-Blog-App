
import express from "express";
import { createComment, getPostComments, likeComment, editComment, deleteComment, getAllComments } from "../controllers/commentController.js";
import { verifyToken } from "../utilis/verifyToken.js";

// create router 
const router = express.Router();

// routing
router.post("/create", verifyToken, createComment); 
router.get("/getPostComments/:postId", getPostComments); 
router.patch("/likeComment/:commentId", verifyToken, likeComment);
router.patch("/editComment/:commentId", verifyToken, editComment);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);
router.get("/getComments", verifyToken, getAllComments)

// export default router 
export default router;



