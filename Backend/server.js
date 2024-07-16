import dotenv from "dotenv"
import {app ,server} from "./socket/socket.js"
import cookieParser from 'cookie-parser'
import express from 'express'
import connectDB from "./db/connectDB.js";
import bodyParser from "body-parser" 
import {v2 as cloudinary} from 'cloudinary'



dotenv.config(
    {
        path:'.env'
    }
);

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(cookieParser())

import userRoutes from './routes/userRoutes.js'
import postRoutes from "./routes/postRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"

app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/messages",messageRoutes);



const PORT  = process.env.PORT || 5000;


connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log(`Server started running at http://localhost:${PORT}`);
     })
}).catch((error)=>{
    console.log("Error during connection error",error);
})
