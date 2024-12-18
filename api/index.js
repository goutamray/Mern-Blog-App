import express from "express";
import dotenv from "dotenv"
import colors from "colors"
import cors from "cors" ;
import mongoDbConnect from "./config/mongoDb.js";
import { errorHandler } from "./utilis/errorHandler.js";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import commentRouter from "./routes/comment.js";

import path from "path"

// env config
dotenv.config();

// init express
const app = express();

// static folder 
app.use(express.static("public"));

// set middleware 
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cookieParser()); 
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true,
}));

const __dirname = path.resolve();

// routes 
app.use("/api/user", userRouter); 
app.use("/api/auth", authRouter); 
app.use("/api/post", postRouter); 
app.use("/api/comment", commentRouter); 


app.use(express.static(path.join(__dirname, '/client/dist'))); 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
}); 

// error handler 
app.use(errorHandler); 

app.listen(5050, () => {
  mongoDbConnect(),
  console.log(` Server is running on port 5050`.bgGreen.black);
})




