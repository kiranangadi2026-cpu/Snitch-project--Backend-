import {body} from "express-validator"

export const createProductValidator = [
    body("title")
        .exists().withMessage("Title is requried").bail()
        .isString().withMessage("Title must be string")
        .trim()
        .isLength({min:2, max:100}).withMessage("Minimum 2 and max 100 characters")
        .isAlpha("en-US", {ignore: " "}).withMessage("Title can only have english small case and chapital case"),
    body("description")
        .exists().withMessage("Description is requierd").bail()
        .isSting().withMessage("Description must be string")
        .trim()
        .isLength({min:20, max:500}).withMessage("Min 20 and max 500 letters"),
    body("price.amount")
        .exists().withMessage("Price amount is required").bail()
        .isFloat({min:0}).withMessage("price must be a float and greater that 0"),
    body("price.currency")
        .exists().withMessage("Currency is requreid")
        .isSting().withMessage("it must be in string format")
        .isIn(["INR, USD"]).withMessage("Currency either be INR or USD")


]