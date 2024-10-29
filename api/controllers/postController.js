import asyncHandler from "express-async-handler"; 
import Post from "../models/Post.js";
import mongoose from "mongoose";


/**
 * @DESC CREATE POST 
 * @METHOD POST
 * @ROUTE /api/post/create
 * @ACCESS PRIVATE  
 * 
 */
export const createPost = asyncHandler(async(req, res) => {
   if (!req.user.isAdmin) {
     return res.status(400).json({ message : "You are not allow to create a post"});
   }

   if (!req.body.title || !req.body.content) {
     return res.status(400).json({ message : "All fields are required"});
   }

   const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

    // new post 
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });

   try {
     const savePost = await newPost.save();

     return res.status(201).json(savePost);

   } catch (error) {
    console.log(error.message);
    
   }
}); 


/**
 * @DESC GET ALL POSTS 
 * @METHOD GET
 * @ROUTE /api/post/getposts
 * @ACCESS PRIVATE  
 * 
 */
export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
  console.log(error);
  
  }
};



/**
 * @DESC DELETE POSTS 
 * @METHOD DELETE
 * @ROUTE /api/post/deletepost/:postId/:userId
 * @ACCESS PRIVATE  
 * 
 */
export const deletePost = asyncHandler(async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }

  try {
    const postId = req.params.postId;
    
    // Check if postId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return next(errorHandler(400, 'Invalid post ID'));
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
});


/**
 * @DESC UPDATE POSTS 
 * @METHOD UPDATE
 * @ROUTE /api/post/updatepost/:postId/:userId
 * @ACCESS PRIVATE  
 * 
 */
export const updatePost = asyncHandler(async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return res.status(400).json({ message : "You are not allowed to update this post"})
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);

  } catch (error) {
    console.log(error.message);
  }

});



