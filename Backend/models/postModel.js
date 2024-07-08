import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({

    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true,
    },
    text:{
        type:String,
        maxLength:5000,
    },
    img:{
        type:String
    },
    likes:{
        typeof:[mongoose.Schema.Types.ObjectId],
        ref:"User",
        default:[]

    },
    replies:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            text:{
                type:String,
                required:true,

            },
            userProfilePic:{
                type:String,

            },
            usename:{
                type:String
            }
        }
    ]


},{timestamps:true})


const Post = mongoose.model("Post",postSchema);

export default Post;


