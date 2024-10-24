import express from "express";
import dotenv from "dotenv"
import colors from "colors"
import mongoDbConnect from "./config/mongoDb.js";

// env config
dotenv.config();

// init express
const app = express();

// static folder 
app.use(express.static("public"));


app.listen(3000, () => {
  mongoDbConnect(),
  console.log(` Server is running on port 3000`.bgGreen.black);
})




