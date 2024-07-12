import User from "../models/userModel.js";
import jwt from "jsonwebtoken"

const protectRoute = async(req,res)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        const user = await User.findById(decoded.userId).select("-password")

        req.user = user;

        next();


        const decoded = jwt.verify(token , process.env.JWT_SECRET)
    } catch (error) {
        res.status(500).json({
            message:error.message
        })

        console.log("Error in signupUser: ",error.message);


        
    }
}



export default protectRoute;