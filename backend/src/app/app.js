import express from "express"
import connectDB from "../config/db.js"
import authRouter from "../routes/auth.routes.js"
import cookieParser from "cookie-parser"
import productRouter from "../routes/product.route.js"

const app = express()
app.use(express.json())
app.use(cookieParser)

await connectDB()

app.use("/api/auth",authRouter)
app.use("/api/product", productRouter)

export default app