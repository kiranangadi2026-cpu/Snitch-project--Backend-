import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs"

export async function register(req, res){

    const { email, name, password } = req.body
 
    const userExits = userModel.findOne({
        email
    })

    if(userExits){
        return res.status(400).json({
            message:"USer already exists",
            errors:[
                {
                    field:"email",
                    message:"User has already registered using this email"
                }
            ]
        })
    }

    const user = await userModel.create({
        name,
        email,
        passwordHash:await bcrypt.hash(password, 12)
    })

}