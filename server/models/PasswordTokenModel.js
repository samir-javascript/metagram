import mongoose from "mongoose";
const PasswordTokenModel = new mongoose.Schema({
     user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
     },
     token: {
        type: String,
        required: true
     },
     
})
const PasswordVerificationToken = mongoose.models.PasswordVerificationToken || mongoose.model('PasswordVerificationToken',PasswordTokenModel)
export default PasswordVerificationToken