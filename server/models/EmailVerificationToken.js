import mongoose from "mongoose";
const EmailVerificationModel = new mongoose.Schema({
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
const EmailVerificationToken = mongoose.models.EmailVerificationToken || mongoose.model('EmailVerificationToken',EmailVerificationModel)
export default EmailVerificationToken