import {Router }from "express"
import { registerValidator } from "../validators/auth.validator.js"
import { register } from "../controllers/auth.controller.js"


const router = Router()


router.post("/", registerValidator, register)

export default router
