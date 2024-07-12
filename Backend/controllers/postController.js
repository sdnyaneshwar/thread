import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary"



const creatPost = async (req, res) => {
    try {
        const { postedBy, text } = req.body;
        let { img } = req.body;

        if (!postedBy || !text) {
            return res.status(400).json({
                error: "Posted by and text field are reuired"

            })
        }

        const user = await User.findById(postedBy);


        if (!user) {
            return res.status(404).json({
                error: "User not found"

            })
        }

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                error: "Unauthorized to create post"

            })
        }

        const maxLength = 500;

        if (text.lemgth > maxLength) {
            return res.status(400).json({
                error: `Text must be less than ${maxLength}`

            })
        }

        if (!img) {
            const uploadedResponce = await cloudinary.uploader.upload(img)
            img = uploadedResponce.secure_url;

        }

        const newPost = new Post({ postedBy, text, img });
        await newPost.save();


    } catch (error) {
        res.status(500).json({
            error:error.message
        })

        console.log(error);

    }
}

const getPost = async(req,res)=>{
    try {
        
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                error:"Post not found"
            })
        }

        res.status(200).json(post);


    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

const deletePost = async(req,res)=>{
    try {
        const post = await Post.findById(res.params.id);

        if(!Post){
            return res.status(404).json({
                error:"Post not found"
            })
        }

        if(post.postedBy.toString() != req.user.id.toString()){
            return res.status(401).json({
                error:"Unauthorized to delete Post"
            })
        }

        if(post.img){
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);

        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message:"Post deleted Successfully"
        })


    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

const likeUnlikePost =async(req,res)=>{
    try {
        const {id:postId} = req.params;
        const userId = req.use._id;

        const post = await Post.findById(postId)

        if(!post){
            return res.status(404).json({
                error:"Post not found"
            })
        }

        const userLikedPost = post.likes.includes(userId)

        if(userLikedPost){
            await Post.updateOne({_id:postId},{$pull:{likes:userId}})
            res.status(200).json({
                message:"Post unlike successfully"
            })
        }
        else{
            post.likes.push(userId)
            await post.save()
            res.status(200).json({
                message:"Post liked successfully"

            })

        }



    } catch (error) {
        res.status(500).json({
            error:error.message
        })       
    }
}

const replyToPost = async(req,res)=>{
    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId  = req.user._id;
        const userProfilePic= req.user.userProfilePic;
        const username = req.user.username;

        if(!text){
            return res.status(400).json({
                error:"The text fieldis required"

            })

        }
        const post = await Post.findById(postId)

        if(!post){
            return res.status(404).json({
                error:"Post not found"
            })
        }

        const reply = {userId , text , userProfilePic , username}

        post.replies.push(reply)

        await post.save()

        res.status(200).json(reply)



    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


//following user uploaded posts
const getFeedPost = async(req,res)=>{
    try {
        const userId = req.user._id;
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({
                error:"User not found"

            })
        }

        const following = user.following;
        const feedPosts = await Post.find({postedBy: { $in : following}}).sort({createdAt:-1});

        res.status(200).json(feedPosts)

      } catch (error) {
        res.status(500).json({error:error.message})
    }
}


const getUserPosts = async(req,res)=>{
    const {username} = req.params;
try {
        const user = await User.findOne({username})
    
        if(!user){
            return res.status(404).json({
                error:"User not found"
            })
        }
    
        const posts = await Post.find({postedBy:user._id}).sort({createdAt:-1})
    
        res.status(200).json(posts)
    
} catch (error) {
    res.status(500).json({
        error:error.message
    })
}
}

export {
    creatPost , 
    getFeedPost ,
    getUserPosts,
    getPost,
    deletePost,
    likeUnlikePost,
    replyToPost
}



