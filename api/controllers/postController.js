import asyncHandler from "express-async-handler"; 
import Post from "../models/Post.js";


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
 

})





