import Post from '../models/postModel.js';
import cloudinary from '../utils/cloudinary.js';
import User from '../models/userModel.js'
import Comment from '../models/commentModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createPost = asyncHandler (async (req, res) => {
    try {
        const { location, media, caption, tags } = req.body;
        const postTags = tags?.replace(/ /g, '').split(',') || [];

        
         

      
        const result = await cloudinary.uploader.upload(media, {
            upload_preset: 'appGram',
            
        });

        // Create post in database
        const post = await Post.create({
            location,
            media: result.secure_url,
            caption,
            tags: postTags,
            creator: req.user._id,
        });

        // Respond with created post data
        res.status(201).json({
            _id: post._id,
            location: post.location,
            media: post.media,
            tags: post.tags,
            creator: post.creator,
            caption: post.caption,
        });
    } catch (error) {
        console.error('Error in createPost:', error);
        res.status(500)
        throw new Error('Interval server error',error)
    }
})
const getPosts = asyncHandler (async(req,res)=> {
    try {
        const page = Number(req.query.pageNumber) || 1
        const pageSize = 2;
        const skipAmount = pageSize * (page - 1)
        const count = await Post.countDocuments({})
        const posts = await Post.find({})
       
        .populate({path: "creator", model: User})
        .sort({createdAt: -1})
        .populate({path: "upvotes"}) 
        .populate({ 
            path: "comments", model: Comment ,
            populate: [
                {path: "user_id",model: User}
            ]
        }).limit(pageSize)
        .skip(skipAmount)
        if(posts) {
            res.status(200).json({posts,page,pages:Math.ceil(count / pageSize)})

        }else {
            res.status(404)
            throw new Error('Posts not found')
        }
    } catch (error) {
         console.log(error)
         res.status(500)
         throw new Error('Internal server error')
    }
})
const explorePosts = asyncHandler( async (req,res)=> {
    try {
        const page = Number(req.query.pageNumber) || 1;
        const pageSize = 2;
        const skipAmount = pageSize * (page - 1);
        const count = await Post.countDocuments({
            creator: {$ne: req.params.id}
         })
        const posts = await Post.find({
            creator: {$ne: req.params.id}
         }).sort({upvotes:-1}, {comments: -1})
         .populate({path: "creator", model: User, select: "_id name username picture"})
         .limit(pageSize)
         .skip(skipAmount)

         res.status(200).json({posts,page,pages:Math.ceil(count / pageSize)})
    } catch (error) {
         console.log(error)
         res.status(500)
         throw new Error('Interval server error')
    }
})
const deletePost = asyncHandler( async(req,res)=> {
    try {
        const { postId } = req.body;
        const post = await Post.findById(postId)
       
        if(post) {
            await Post.findByIdAndDelete(post._id)
            res.status(200).json({message: "Post has been deleted"})
        }else {
              res.status(404)
              throw new Error("Post not found")
        }
    } catch (error) {
         console.log(error)
         res.status(500)
         throw new Error('Internal server error')
    }
})
const editPost = asyncHandler( async(req,res)=> {
    try {
        const { caption,media,location,tags} = req.body;
        const post = await Post.findById(req.params.id)
        const postTags = tags?.replace(/ /g, '').split(',') || [];

        const result = await cloudinary.uploader.upload(media, {
            upload_preset: 'appGram',
            
        });
        if(post) {
            post.caption = caption || post.caption;
            post.media = result.secure_url || post.media;
            post.tags = postTags || post.tags;
            post.location = location || post.location;
            const updatedPost = await post.save()
            res.status(200).json(updatedPost)
        }else {
            res.status(404)
            throw new Error('Post not found')
        }
    } catch (error) {
         console.log(error)
         res.status(500)
         throw new Error('Internal server error')
    }
})
const getPostById = asyncHandler( async(req,res)=> {
    try {
         const post = await Post.findById(req.params.id)
         .populate({path: "creator", model: User, select: "username name _id picture "})
         .populate({
            path: "comments", model: Comment,
            populate: [
                  {path: "user_id", model: User}
            ]
        })
         if(post) {
            res.status(200).json(post)
         }else  {
            res.status(404)
            throw new Error('Post not found')
         }
    } catch (error) {
         console.log(error)
         res.status(500)
         throw new Error('Internal server error')
    }
})

const toggleLikePost = asyncHandler( async (req, res) => {
    const { postId } = req.body;
    
    try {
       
       

        // Fetch user and post
        const user = await User.findById(req.user._id);
        const post = await Post.findById(postId);

        if (!user) {
             res.status(404)
            throw new Error('USER not  found')
        }
        if (!post) {
            res.status(404)
           throw new Error('POST not  found')
       }

        const isAlreadyLiked = post.upvotes.includes(user._id);

        if (isAlreadyLiked) {
            await Post.findByIdAndUpdate(post._id, {
                $pull: { upvotes: user._id }
            }, { new: true });
            await User.findByIdAndUpdate(user._id, {
                $pull: { liked: post._id }
            }, { new: true });
            res.status(200).json({ message: "Post has been unliked", post });
        } else {
            await Post.findByIdAndUpdate(post._id, {
                $addToSet: { upvotes: user._id }
            }, { new: true });
            await User.findByIdAndUpdate(user._id, {
                $addToSet: { liked: post._id }
            }, { new: true });
            res.status(200).json({ message: "Post has been liked", post });
        }
    } catch (error) {
        console.error(error);
        res.status(500)
        throw new Error('Internal server error')
    }
})
const userPosts =  asyncHandler( async(req,res)=> {
    try {
        const posts = await Post.find({creator: req.params.id})
        if(!posts) {
            res.status(404)
            throw new Error("No post was found")
        }else {
            res.status(200).json(posts)
        }
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error('Internal server error')
    }
})

const toggleSavePost = asyncHandler( async(req,res)=>  {
    try {
         const { postId } = req.body;
         const user = await User.findById(req.user._id)
         if(!postId) {
            throw new Error("Invalid post id")
         }
         const post = await Post.findById(postId)
         const isAlraedySaved = user.saved.includes(post._id)
         if(isAlraedySaved) {
            await User.findByIdAndUpdate(user._id, {
                $pull: {saved: post._id}
            }, {new: true})
            res.status(200).json({message: "post has been removed from your saved collection "})
         }else {
            await User.findByIdAndUpdate(user._id, {
                $addToSet: {saved: post._id}
            }, {new: true})
            res.status(200).json({message: "post has been added to your saved collection "})
         }
    } catch (error) {
         console.log(error)
         res.status(500)
        
         throw new Error('Internal server error')
    }
})

const createPostComment = asyncHandler( asyncHandler( async(req,res)=> {
    try {
        const {content,post_id} = req.body;
        const comment = await Comment.create({
            content,
            user_id: req.user._id,
            post_id
        })
        if(comment) {
            await Post.findByIdAndUpdate(post_id, {
                $push: {comments: comment._id}
            })
            res.status(201).json({message: "comment has been created"})
        }

    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error('Internal server error')
    }
}
))

export { createPost , getPosts,   deletePost, userPosts, editPost, getPostById, explorePosts, createPostComment, toggleLikePost, toggleSavePost};
