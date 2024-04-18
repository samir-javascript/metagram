import  mongoose, {Schema} from "mongoose";
import bcrypt  from 'bcryptjs'
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    PortfolioLink: {
        type: String,
    },
    genre: {
        type: String,
        required: true,
        enum: ['male', 'female', 'unknown']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    saved: [{type: Schema.Types.ObjectId , ref: 'Post'}],
    liked: [{type: Schema.Types.ObjectId , ref: 'Post'}],
}, {
    timestamps: true
})
// hash password before saving to db,
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
}) 
// compare password with the entered password,
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return bcrypt.compare(enteredPassword,this.password)
}
const User = mongoose.models.User || mongoose.model("User", UserSchema)
export default User