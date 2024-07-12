import express from "express"
import {
    creatPost,
    deletePost,
    getFeedPost,
    getPost,
    getUserPosts,
    likeUnlikePost,
    replyToPost
} from "../controllers/postController.js"


import protectRoute from "../middlewares/protectedRoute.js"

const router = express.Router()

router.get("/feed",protectRoute,getFeedPost)
router.get("/:id",getPost)
router.get("/user/:username",getUserPosts);
router.post("/create",protectRoute,creatPost)
router.delete("/:id",protectRoute,deletePost)
router.put("/like/:id",protectRoute,likeUnlikePost)
router.put("reply/:id",protectRoute,replyToPost)

export default router;


