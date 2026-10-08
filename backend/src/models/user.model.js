import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        requried:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    passwordHash:{
        type:String,
        required:true,
        minLength:6
    },
    role:{
        //user or seller
        type:String,
        default:"user",
        enum:["user", "seller"]
    },
    refreshToken:{
        type:String
    }
})

const userModel = mongoose.model("users", userSchema)
export default userModel