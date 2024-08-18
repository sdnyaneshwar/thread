import Conversation from '../models/conversationModel.js'
import Message from '../models/messageModel.js'
import {getRecipientSocketId, io , } from "../socket/socket.js"
import {v2 as cloudinary} from 'cloudinary'

const sendMessage = async(req, res) =>{
    try {
        const {recipientId ,message}   = req.body;
        let {img} = req.body;

        const senderId = req.user._id;

        let conversion = await Conversation.findOne({
            participants:{$all:[senderId,recipientId]}
        })

        if(!conversion){
            conversion = new Conversation({
                participants:[senderId,recipientId],
                lastMessage:{
                    text:message,
                    sender:senderId
                }
            })

            await conversion.save()
        }

        if(img){
            const uploadedresponse = await cloudinary.uploader.upload(img)
            img = uploadedresponse.secure_url;
        }

        const newMessage = new Message({
            conversationId:conversion._id,
            sender:senderId,
            text:message,
            img:img || "",
        })

        await Promise.all([
            newMessage.save(),
            conversion.updateOne({
                lastMessage:{
                    text:message,
                    sender:senderId
                }
            })

        ])


        const recipientSocketId = getRecipientSocketId(recipientId)

        if(recipientId){
            io.to(recipientSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage)


    } catch (error) {
        res.status(500).json({
            error:error.message
        })       
    }
}


const getMessages = async(req,res)=>{
    const {otherUserId} = req.params;

    const userId = req.user._id;

    try {
        const conversation = await Conversation.findOne({
          participants:{  $all:[userId,otherUserId]}
        }) 

        if(!conversation){
            return res.status(404).json({
                error:"Conversation not found"
            })
        }

        const messages =await Message.find({
            conversationId:conversation._id
        })

        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }

}


const getConversations = async(req,res)=>{
    const userId = req.user._id;
    console.log(userId);
    try {
        const conversations = await Conversation.find({
            participants:userId
        }).populate({
            path:"participants",
            select:"username profilePic",
        })
        console.log(conversations);

        conversations.forEach((conversation)=>{
            conversation.participants = conversation.participants.filter(
                (participant)=>participant._id.toString() != userId.toString()
                )
        })

        res.status(200).json(conversations)

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

export {sendMessage , getMessages , getConversations}