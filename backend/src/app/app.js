import express from "express"
import connectDB from "../config/db.js"

const app = express()
app.use(express.json())

await connectDB()

export default app