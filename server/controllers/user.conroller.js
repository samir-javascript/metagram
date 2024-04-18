import { isValidObjectId } from "mongoose";
import Post from "../models/postModel.js";
import cloudinary from '../utils/cloudinary.js'
import User from "../models/userModel.js"

import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const authUser = asyncHandler ( async(req,res)=>  {
    const { password,email} = req.body;
     
        const user = await User.findOne({email})
        if(user && (await user.matchPassword(password)))  {
            generateToken(user._id,res)
            res.status(200).json({
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                genre: user.genre,
                liked: user.liked,
                saved: user.saved

            })
        }else  {
            res.status(401)
            throw new Error('Invalid email or password')
        }
      } )

const registerUser = asyncHandler ( async(req,res)=> {
    const { name,username, gender,email,password} = req.body;
    
        const userExists = await User.findOne({email})
        if(userExists) {
            throw new Error('User already exists!')
           }
           const user = await User.create({
            name,
            username,
            password,
            email,
            genre: gender,
            
        })
        if(user) {
            generateToken(user._id,res)
            res.status(200).json({
                _id: user._id,
                name: user.name,
                gender: user.gender,
                username: user.username,
                email: user.email,
                
                liked: user.liked,
            saved: user.saved
            })
        }else {
           res.status(401)
           throw new Error('Invalid credentials')
        }
    } 
     
     
     
      
    )
const logoutUser = asyncHandler (async(req,res)=> {
   
        res.clearCookie("appGramJWT");
        res.status(200).json({message: "user has been logged out seccessfuly"})
    } 
    )
const getProfile = asyncHandler (async(req,res)=> {
    try {
        const user = await User.findById(req.params.id).select("-password")
        .populate({path: "followers", model: User, select: "_id name picture username"})
        .populate({path: "following", model: User, select: "_id name picture username"})
        .populate({
            path: "liked",
            populate: [
                {path: "creator", model: User}
             ]
        })
        
        if(user) {
            res.status(200).json(user)
        }else {
            res.status(404)
            throw new Error("User not found")
        }
    } catch (error) {
         console.log(error)
         res.status(500)
         throw new Error('Interval server error')
    }
})
const getCurrentUser = asyncHandler (async(req,res)=> {
    try {
        const user = await User.findById(req.user._id)
        if(!user) {
            res.status(404)
            throw new Error('User not found')
        }else {
            res.status(200).json(user)

        }
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error('Internal server error')
    }
})
const getAllUsers = asyncHandler( async (req, res) => {
    try {
       
        const users = await User.find({
            _id: { $ne:  req.user._id }, followers: {$ne: req.user._id},
        });

        // Check if users array is not empty
        if (users && users.length > 0) {
            res.status(200).json(users); // Respond with the list of users
        } else {
            // Respond with a 404 Not Found error if no users were found
            res.status(404).json({ message: "No users found" });
        }
    } catch (error) {
        // Handle and log any errors that occur during the database query
        console.error("Error fetching users:", error);
        res.status(500)
        throw new Error('Internal server error')
    }
})
const toggleFollow = asyncHandler( async(req,res)=> {
   try {
      const { userToFollowId } = req.body;
      const currentUser = await User.findById(req.user._id)
      const userToFollow = await User.findById(userToFollowId)
      if(!isValidObjectId(currentUser)) {
          res.status(400)
          throw new Error("Invalid user ID")
      }
      if(!isValidObjectId(userToFollowId)) {
        res.status(400)
        throw new Error("Invalid usertoFollow ID")
    }
      const isAlreadyFollowed = currentUser.following.includes(userToFollow._id)
      if(isAlreadyFollowed) {
         await User.findByIdAndUpdate(currentUser._id, {
            $pull: {following: userToFollow._id}
         }, {new: true})
         await User.findByIdAndUpdate(userToFollow._id, {
            $pull: {followers: currentUser._id}
         }, {new: true})
         res.status(200).json({message: "unfollowed successfuly"})
      }else {
        await User.findByIdAndUpdate(currentUser._id, {
            $addToSet: {following: userToFollow._id}
         }, {new: true})
         await User.findByIdAndUpdate(userToFollow._id, {
            $addToSet: {followers: currentUser._id}
         }, {new: true})
         res.status(200).json({message: "followed successfuly"})
      }
   } catch (error) {
     console.log(error)
     res.status(500)
     throw new Error('Internal server error')
   }
})

const updateProfile = asyncHandler (async(req,res)=> {
    try {
        const { name, username, picture, email, bio, location} = req.body;
        const user = await User.findById(req.params.id)
        const result = await  cloudinary.uploader.upload(picture, {
            upload_preset: "appGram"
        })
        if(!user) {
            res.status(404)
            throw new Error('User not found')
        }else {
            if(req.body.password) {
                user.password = req.body.password;
             }
             user.name = name || user.name;
             user.username = username || user.username;
             user.email = email || user.email;
             user.bio = bio || user.bio;
             user.location =  location || user.location;
             user.picture = result.secure_url || user.picture ;
            const updatedUser = await user.save()
            res.status(200).json(updatedUser)
        }
        
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error('Internal server error')
    }
})

const getSavedPosts  = asyncHandler (async(req,res)=> {
     try {
        const user = await User.findById(req.user._id)
        const page = Number(req.query.pageNumber) || 1;
       
        const pageSize = 2;
        const skipAmount = pageSize * (page - 1)
        const totalSavedPosts = await Post.countDocuments({ _id: { $in: user.saved } });
        if(!user) {
            res.status(404)
            throw new Error('User not found')
        }
        const savedPosts = await Post.find({_id: {$in: user.saved}})
        .limit(pageSize)
        .skip(skipAmount)
        
        if(savedPosts.length) {
            res.status(200).json({savedPosts,page,pages:totalSavedPosts / pageSize})
        }
     } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error('Internal server error')
     }
})

const getAllUsersForConvesation = asyncHandler( async(req,res)=>  {
     try {
        const users = await User.find({
            _id:{$ne: req.user._id}
        })
        res.status(200).json(users)
     } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error('Internal server error')
     }
}

)



export {
    authUser,
   getAllUsersForConvesation,
    logoutUser,
    getProfile,
    getCurrentUser,
    registerUser,
    getAllUsers,
    toggleFollow,
    updateProfile,
    getSavedPosts
}