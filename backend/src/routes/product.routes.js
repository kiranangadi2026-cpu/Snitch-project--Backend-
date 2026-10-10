import {Router} from "express"
import { createProductValidator } from "../validators/product.validator.js"
import { authenticate } from "../middlewares/auth.middleware.js"
import { createProduct } from "../controllers/product.controller.js"

import multer from "multer"

const upload = multer({
    storage: multer.memoryStorage(), 
    limits:{
        files:5,
        fileSize:1*2024*2024 //1MB
    },

    //fileFilter : to accepct the file type audio video images etc...


})

const router = Router()

router.post("/", authenticate, 
    
    (req, res, next)=>{

    if(req.user.role != "seller"){
        return res.status(403).json({
            message:"User is not autherized to create products"
        })
    }

    next()
}, upload.array("images"), 

    (req, res, next)=>{

    req.body?.price && (req.body.price = JSON.parse(req.body.price))
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes))

    next()

},
createProductValidator,
createProduct)

export default router
