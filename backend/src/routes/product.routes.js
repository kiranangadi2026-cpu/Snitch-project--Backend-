import {Router} from "express"
import { createProductValidator, listProductValidator, unlistProductValidator } from "../validators/product.validator.js"
import { authenticate, authenticateSeller } from "../middlewares/auth.middleware.js"
import { createProduct, listAllProducts, listAllProductsToSeller, listProduct, unlistProduct } from "../controllers/product.controller.js"

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

router.post("/", authenticate, authenticateSeller, upload.array("images"), 
    (req, res, next)=>{

    req.body?.price && (req.body.price = JSON.parse(req.body.price))
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes))

    next()

},
createProductValidator,
createProduct)

router.get("/seller", authenticate, authenticateSeller, listAllProductsToSeller)

router.get("/", authenticate, listAllProducts)

router.patch("/unlist/:id", authenticate, authenticateSeller, unlistProductValidator, unlistProduct)
router.patch("/unlist/:id", authenticate, authenticateSeller, listProductValidator, listProduct)

export default router
