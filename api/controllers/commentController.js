
import asyncHandler from "express-async-handler"; 
import Comment from "../models/Comment.js";

/**
 * @DESC CREATE COMMENT 
 * @METHOD POST
 * @ROUTE /api/comment/create
 * @ACCESS PUBLIC 
 * 
 */
export const createComment = asyncHandler(async(req, res) => {
  try {
    const { content, userId, postId } = req.body;

    // validation 
    if (userId !== req.user.id) {
      return res.status(400).json({ message : "You are not allow to comment"});
    }

    // create comment 
   const newComment = new Comment({
    content,
    userId,
    postId
   });

   await newComment.save();

   // response
   return res.status(201).json(newComment); 

  } catch (error) {
     console.log(error.message);  
  }
});

