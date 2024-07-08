import mongoose from "mongoose" 


const connectDB =async()=>{
    try {
        console.log(process.env.MONGODB_URL);
        const response = await mongoose.connect(process.env.MONGODB_URL ||" ",{ })

        console.log("MongoDB Connected");

    } catch (error) {
        console.log("Problem during database connection");
        process.exit(1)
    }
}


export default connectDB;