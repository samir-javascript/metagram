import mongoose, { Schema } from "mongoose";
const ConversationModel = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message",
        required: true
    }]
}, {
    timestamps: true
})
const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", ConversationModel)
export default Conversation