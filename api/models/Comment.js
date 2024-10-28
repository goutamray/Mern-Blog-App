

import mongoose from "mongoose";

// create user schema
const commentSchema = mongoose.Schema({
  content : {
    type: String,
    trim : true,
  }, 
  postId : {
    type: String,
    trim : true,
  },
  userId : {
    type: String,
    trim : true,
  },
  likes : {
    type : Array,
    default : []
  },
  numberOfLikes : {
    type : Number,
    default : 0
  }
}, 
{
  timestamps : true,
}
); 

// export default schema
export default mongoose.model("Comment", commentSchema)


