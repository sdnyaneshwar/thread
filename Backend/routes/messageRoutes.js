import express from 'express'
import {getConversations,
    getMessages,
    sendMessage
} from '../controllers/messageController.js'
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

router.get("/conversation",protectRoute,getConversations)
router.get("/:otherUserId",protectRoute,getMessages)
router.post("/",protectRoute,sendMessage)


export default router;

