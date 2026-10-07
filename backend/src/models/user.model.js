import mongoose from "mongoose"

const useSchema = new mongoose.Schema({
    email:{
        type:String,
        requried:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    role:{
        //user or seller
        type:String,
        default:"user",
        enum:["user", "seller"]
    }
})

const userModel = mongoose.model("users", userSchema)
export default userModel