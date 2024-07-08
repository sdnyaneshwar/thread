import dotenv from "dotenv"
import {app ,server} from "./socket/socket.js"
import cookieParser from 'cookie-parser'
import express from 'express'
import connectDB from "./db/connectDB.js";





dotenv.config(
    {
        path:'.env'
    }
);

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



const PORT  = process.env.PORT || 5000;


connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log(`Server started running at http://localhost:${PORT}`);
     })
}).catch((error)=>{
    console.log("Error during connection error",error);
})
