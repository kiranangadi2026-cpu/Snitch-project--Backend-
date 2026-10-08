import express from "express"
import connectDB from "../config/db.js"
import authRouter from "../routes/auth.routes.js"

const app = express()
app.use(express.json())

await connectDB()

app.use("/api/auth", authRouter)

export default app