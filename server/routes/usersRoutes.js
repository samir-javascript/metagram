import express from 'express'
import { authUser, getAllUsers, getAllUsersForConvesation, getCurrentUser, getProfile, getSavedPosts, logoutUser, registerUser, resetPasswordRequest, toggleFollow, updateProfile, updateUserPassword, verifyPasswordToken, verifyToken } from '../controllers/user.conroller.js'
import { protect } from '../middlewares/authMiddleware.js'
import { userPosts } from '../controllers/post.controller.js'
const router = express.Router()
router.route("/login").post(authUser)
router.route("/register").post(registerUser)
router.route("/").post(logoutUser)
router.route('/').get(protect, getAllUsers)
router.route('/chat-users').get(protect, getAllUsersForConvesation)
router.route('/profile/:id').get(protect,getProfile)
router.route("/my-posts/:id").get(protect,userPosts)
router.route("/profile").get(protect,getCurrentUser)
router.route("/follow_users").post(protect,toggleFollow)
router.route('/update-profile/:id').post(protect,updateProfile)
router.route('/get-saved_posts').get(protect,getSavedPosts)
router.route('/verify-token').post(verifyToken)
router.route('/reset-password_request').post(resetPasswordRequest)
router.route('/verify-password_token').post(verifyPasswordToken)
router.route('/update-user-password').put(updateUserPassword)
// router.route('/get_user_profile-followers/:id').get(protect,getProfileUserFollwers)
export default router