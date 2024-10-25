import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"; 

// verify token 
export const verifyToken = (req, res, next) => {
    // get cookie 
    const accessToken = req.cookies.access_token;

    // check token
    if (!accessToken) {
      return res.status(400).json({  message : "Unauthorized"}); 
    }; 

  // verify token user
    jwt.verify(accessToken, process.env.JWT_SECRET, 
      asyncHandler(async(error, user) => {
         
        if (error) {
           return res.status(400).json({ message : "Invalid Token"})
        }

       // get login user data 
        req.user = user;
        next(); 

      })
    );
}






