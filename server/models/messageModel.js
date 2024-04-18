import mongoose,{ Schema } from "mongoose";
const MessageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    sender_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        
    },
}, {
    timestamps: true
})
const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema)
export default Message