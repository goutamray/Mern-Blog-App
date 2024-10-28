
import express from "express";
import { createComment, getPostComments } from "../controllers/commentController.js";
import { verifyToken } from "../utilis/verifyToken.js";

// create router 
const router = express.Router();

// routing
router.post("/create", verifyToken, createComment); 
router.get("/getPostComments/:postId", getPostComments); 


// export default router 
export default router;



