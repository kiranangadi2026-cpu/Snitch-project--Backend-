import {body, validationResult} from "express-validator"

export const addToCartValidator = [
    body("productId")
        .exists().withMessage("Product is required").bail()
        .isString().withMessage("Enter in string format").bail()
        .isMongoId().withMessage("Product ID must be valid mongo ID"),
    body("quantity")
        .exists().withMessage("Quantity is required").bail()
        .isInt({min:1}).withMessage("Quantity must be integer format"),
    body("size")
        .exists().withMessage("Size is required").bail()
        .isString().withMessage("Size must be in string format").bain()
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("Size must be one is XS S M L XL XXL"),
    (req, res, next) =>{

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"validation failed",
                errors: errors.array()
            })
        }
        next()

    }
]