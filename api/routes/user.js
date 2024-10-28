
import express from "express";
import { getAllUsers, updateUser, deleteUser, signOutUser, getUser } from "../controllers/userController.js";
 import { verifyToken } from "../utilis/verifyToken.js";
import { userPhotoMulter } from "../utilis/multer.js";


// create router 
const router = express.Router();

// routing
router.get("/getUsers", verifyToken, getAllUsers); 
router.patch("/update/:id", verifyToken, userPhotoMulter, updateUser); 
router.delete("/delete/:id", verifyToken, deleteUser);
router.post("/signout", signOutUser)
router.get("/:userId", getUser); 

// export default router 
export default router;


