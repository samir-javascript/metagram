import { isValidObjectId } from "mongoose";
import Post from "../models/postModel.js";
import cloudinary from '../utils/cloudinary.js'
import User from "../models/userModel.js"
import crypto from 'crypto'
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { sendEmailForResetPassword, sendEmailForResetSeccuss, sendMail } from "../utils/emailTransporter.js";
import EmailVerificationToken from "../models/EmailVerificationToken.js";
import PasswordVerificationToken from "../models/PasswordTokenModel.js";

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
                picture: user.picture,
                genre: user.genre,
                liked: user.liked,
                saved: user.saved,
                verified: user.verified,
                message: "you have successfuly reset your password"

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
            await EmailVerificationToken.findOneAndDelete({user: user._id})
            let token = await EmailVerificationToken.create({
                 user: user._id,
                 token: crypto.randomBytes(32).toString("hex")
            })
            const text =  `${process.env.VITE_BASE_URL}/resetPassword?user=${user._id}&token=${token.token}`
           await  sendMail(email, "Email verification", text)
            res.status(200).json({
                _id: user._id,
                name: user.name,
                verified: user.verified,
                gender: user.gender,
                username: user.username,
                email: user.email,
                message: "please check out your inbox to verify your email account",
                liked: user.liked,
                saved: user.saved
            })
        }else {
           res.status(401)
           throw new Error('Invalid credentials')
        }
    } 
     
     
     
      
    )
   const verifyPasswordToken = asyncHandler(async(req,res)=> {
      try {
        const { user, token } = req.body;
        if(!token) {
            throw new Error('Invalid token')
        }
        if(!isValidObjectId(user)) {
            res.status(401)
            throw new Error('Invalid user ID')
        }
        const tk = await PasswordVerificationToken.findOne({user})
        if(!tk) {
            res.status(404)
            throw new Error('Token not found')
        }
      
        res.status(200).json({message: "you're legit to reset your password account"})
      } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error('Internal server error',error)
      }
   })
    const verifyToken = asyncHandler(async(req,res)=> {
         try {
             const { token, user} = req.body;
             if(!isValidObjectId(user))  {
                res.status(401)
                throw new Error('Invalid user ID')
             }
           
            const tk = await EmailVerificationToken.findOne({
                user,
                token
             })
             if(!tk) {
                res.status(401)
                throw new Error('Not authorized, no token')
             }
             await User.findByIdAndUpdate(user, {
                verified: true
             })
             await EmailVerificationToken.findByIdAndDelete(tk._id)
             res.status(200).json({
                _id: user._id,
                name: user.name,
                verified: user.verified,
                gender: user.gender,
                username: user.username,
                email: user.email,
                message: "your account has been verified",
                liked: user.liked,
                saved: user.saved
             })
         } catch (error) {
            console.log(error)
            res.status(500)
            throw new Error('Internal server error')
         }
    })
 const updateUserPassword = async(req,res)=> {
     try {
        const { user:userId, token , password } = req.body;
        if(!token) {
            throw new Error('Invalid token')
        }
        if(!password) {
            throw new Error('password is required')
        }
        if(!isValidObjectId(userId)) {
            res.status(400)
            throw new Error('Invalid USER ID')
        }
        const user = await User.findById(userId)
        if(!user) {
            res.status(404)
            throw new Error('User not found')
        }
        const tk = await PasswordVerificationToken.findOne({user:userId})
        if(!tk) {
            res.status(404)
            throw new Error('password token not found')
        }
        user.password = password;
        await user.save()
        await PasswordVerificationToken.findByIdAndDelete(tk._id)
        await sendEmailForResetSeccuss(user.email,"Password reset success", "you have reset your password successfuly")
        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            picture: user.picture,
            genre: user.genre,
            liked: user.liked,
            saved: user.saved,
            verified: user.verified,
            message: "you have successfuly reset your password"
        })
     } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error('Internal server error',error)
     }
 }
   const resetPasswordRequest = asyncHandler(async(req,res)=> {
     try {
         const { email } = req.body;
         const user = await User.findOne({email})
         if(!user) {
             res.status(404)
             throw new Error('User not found')
         }
         // delete any previous tokens;
         await PasswordVerificationToken.findOneAndDelete({user: user._id})
         let token = await PasswordVerificationToken.create({
             user: user._id,
             token: crypto.randomBytes(32).toString("hex")
         })
         if(!token) {
            throw new Error('Failed to create token')
         }
         const text = `${process.env.VITE_BASE_URL}/reset-password_appgram?user=${user._id}&token=${token.token}`
         await sendEmailForResetPassword(email,'Reset password',text)
         res.status(200).json({message: "Please check out your inbox to reset your password"})
     } catch (error) {
         console.log(error)
         res.status(500)
         throw new Error('Internal server error')
     }
   })


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
    verifyPasswordToken,
    updateProfile,
    getSavedPosts,
    verifyToken,
    resetPasswordRequest,
    updateUserPassword
}