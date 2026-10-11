import {Router} from "express"
import { addToCartValidator } from "../validators/cart.validator"
import {authenticate} from "../middlewares/auth.middleware.js"
import { addToCart } from "../controllers/cart.controller.js"


const router = Router()

router.post("/",authenticate, addToCartValidator, addToCart)

router.get("/", authenticate)

export default router