import mongoose from "mongoose";


// create user schema
const postSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content : {
    type : String,
    trim : true, 
  },
  title : {
    type : String,
    trim : true, 
  },
  image : {
    type : String,
    default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDE3NW3fV6OI8fXnksXbM6wee0HFKskWWt4Q&s",
  },
  category : {
    type : String,
    default : "uncategorized",
  },
  slug : {
    type : String,
  }
}, 
{
  timestamps : true,
}
); 

// export default schema
export default mongoose.model("Post", postSchema)