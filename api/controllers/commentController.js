
import asyncHandler from "express-async-handler"; 
import Comment from "../models/Comment.js";


/**
 * @DESC GET ALL COMMENT 
 * @METHOD GET
 * @ROUTE /api/comment/getComments
 * @ACCESS PUBLIC 
 * 
 */
export const getAllComments = asyncHandler(async(req, res) => {
  if (!req.user.isAdmin) {
    return res.status().json({ message : "You are not allow to get all comments"})
  }
  
  try {
     const startIndex = parseInt(req.query.startIndex) || 0;
     const limit = parseInt(req.query.limit) || 9;
     const sortDirection = req.query.sort === "desc" ? -1 : 1;

     const comments = await Comment.find().sort({ createdAt : sortDirection}).skip(startIndex).limit(limit);

     const totalComments = await Comment.countDocuments();

     const now = new Date();

     const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });


    // response 
   return res.status(200).json({ comments, totalComments, lastMonthComments });

  } catch (error) {
    console.log(error.message);
    
  }
})


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


/**
 * @DESC GET COMMENT 
 * @METHOD GET
 * @ROUTE /api/comment/getPostComments
 * @ACCESS PUBLIC 
 * 
 */
export const getPostComments = asyncHandler(async(req, res) => {
  try {
    const comments = await Comment.find({ postId : req.params.postId }).sort({ createdAt : -1 })
    
    return res.status(200).json(comments);
    
  } catch (error) {
    console.log(error.message);
  }
})


/**
 * @DESC UPDATE COMMENT 
 * @METHOD PATCH 
 * @ROUTE /api/comment/likeComment/:commentId 
 * @ACCESS PUBLIC 
 * 
 */
export const likeComment = asyncHandler(async(req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId );

    if (!comment) {
      return res.status(400).json({ message : "Comments Not Found"});
    }

    const userIndex = comment.likes.indexOf(req.user.id);

    if (userIndex === -1) {
      comment.numberOfLikes += 1; 
      comment.likes.push(req.user.id);
    }else{
      comment.numberOfLikes -= 1; 
      comment.likes.splice( userIndex, 1);
    }

    await comment.save(); 

    return res.status(200).json(comment);

  } catch (error) {
    console.log(error.message);
  }
});


/**
 * @DESC UPDATE COMMENT 
 * @METHOD PATCH 
 * @ROUTE /api/comment/editComment/:commentId 
 * @ACCESS PUBLIC 
 * 
 */
export const editComment = asyncHandler(async(req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId );

    if (!comment) {
      return res.status(400).json({ message : "Comments Not Found"});
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(400).json({ message : "You are not allow edit this comment"});
    }

    const editComment = await Comment.findByIdAndUpdate(
      req.params.commentId, 
      {
         content : req.body.content,
      },
      {new : true},
    );

    return res.status(200).json(editComment);

  } catch (error) {
    console.log(error.message);
  }
});

/**
 * @DESC DELETE COMMENT 
 * @METHOD DELETE 
 * @ROUTE /api/comment/deleteComment/:commentId 
 * @ACCESS PUBLIC 
 * 
 */
export const deleteComment = asyncHandler(async(req, res) => {
   try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(400).json({ message : "Comments Not Found"});
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(400).json({ message : "You are not allow delete this comment"});
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json('Comment has been deleted');

   } catch (error) {
    console.log(error.message);
    
   }
})



