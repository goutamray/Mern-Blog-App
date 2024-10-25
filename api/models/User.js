
import mongoose from "mongoose";

// create user schema
const userSchema = mongoose.Schema({
  name : {
    type: String,
    trim : true,
  }, 
  email : {
    type : String,
    trim : true, 
    unique : true,
  },
  password : {
    type : String,
    trim : true, 
  },
  photo : {
    type : String,
    default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
}, 
{
  timestamps : true,
}
); 

// export default schema
export default mongoose.model("User", userSchema)
