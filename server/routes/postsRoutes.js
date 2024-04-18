import express from 'express'

import { protect } from '../middlewares/authMiddleware.js'
import { createPost, createPostComment, deletePost, editPost,  explorePosts,  getPostById, getPosts, toggleLikePost, toggleSavePost, userPosts } from '../controllers/post.controller.js'
const router = express.Router()
router.route('/create-post').post(protect,createPost)
router.route("/getPosts").get(getPosts)
router.route("/explore-posts/:id").get(protect,explorePosts)
router.route("/edit_post/:id").put(protect,editPost)
router.route("/delete_post").delete(protect,deletePost)
router.route("/:id").get(getPostById)
router.route("/toggle-upvote").post(protect, toggleLikePost)
router.route('/toggle-save').post(protect,toggleSavePost)
router.route('/add-comment').post(protect,createPostComment)


export default router