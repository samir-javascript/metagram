import  mongoose, {Schema } from "mongoose";
const PostSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    location: {
       type: String,
    },
     caption: {
        type: String,
        required: true
     },
     media: {
        type: String,
       
    },
     upvotes: [{
         type: Schema.Types.ObjectId,
         ref: "User"
     }],
     comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
        tags: [
               {
                type: String,
                required: true,
                }
        ]
}, {
    timestamps: true
})
const Post = mongoose.models.Post || mongoose.model("Post", PostSchema)
export default Post