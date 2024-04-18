import mongoose ,{ Schema,  } from "mongoose";
const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    post_id: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    timestamps: true
})
const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema)
export default Comment