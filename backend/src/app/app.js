import express from "express"
import connectDB from "../config/db.js"
import authRouter from "../routes/auth.routes.js"
import cookieParser from "cookie-parser"
import productRouter from "../routes/product.routes.js"
import cartRouter from "../routes/cart.routes.js"

const app = express()
app.use(express.json())
app.use(cookieParser)

await connectDB()

app.use("/api/auth",authRouter)
app.use("/api/product", productRouter)
app.use("/api/product", cartRouter)

export default app