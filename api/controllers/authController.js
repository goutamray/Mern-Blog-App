import User from "../models/User.js";
import asyncHandler from "express-async-handler"; 
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"


/**
 * @DESC CREATE USER 
 * @METHOD POST
 * @ROUTE /api/auth/signup
 * @ACCESS PUBLIC 
 * 
 */
export const signup = asyncHandler(async(req, res) => {
  const { name, email, password } = req.body; 

// validation 
if (!name || !email || !password) {
  return res.status(400).json({ users : "", message : "All fileds are required"});
};

// pasword hash 
const hashedPassword = bcryptjs.hashSync(password, 10); 

const newUser = new User({ name, email, password : hashedPassword });

await newUser.save();

return res.json({ newUser, message : "Signup SuccessFull"})
});  


/**
 * @DESC LOGIN USER 
 * @METHOD POST
 * @ROUTE /api/auth/signin
 * @ACCESS PUBLIC 
 * 
 */
export const signin = asyncHandler(async(req, res) => {
  const { email, password } = req.body; 

// validation 
if ( !email || !password) {
  return res.status(400).json({ message : "All fileds are required"});
};

try {
  const validUser = await User.findOne({ email });

  // check email user 
  if (!validUser) {
    return res.status(400).json({ message : "Email User Not Found"});
  }

  const validPassword = bcryptjs.compareSync(password, validUser.password);

  // check password 
  if (!validPassword) {
    return res.status(400).json({ message : "Invalid Password"});
  }

  // create token 
  const accessToken = jwt.sign({ id : validUser._id }, process.env.JWT_SECRET);

  const {password : pass, ...rest } = validUser._doc;

  // response 
  return res.status(200).cookie("access_token", accessToken, { httpOnly : true, }).json(rest); 
  
} catch (error) {
  console.log(error.message);
}

});  


/**
 * @DESC GOOGLE LOGIN USER 
 * @METHOD POST
 * @ROUTE /api/auth/google
 * @ACCESS PUBLIC 
 * 
 */
export const google = asyncHandler( async (req, res) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);

    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        name:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        photo : googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
}) ;

