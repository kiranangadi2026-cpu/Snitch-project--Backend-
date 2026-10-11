import dotenv from "dotenv"

dotenv.config()

const config = {
    MONGO_URI : process.env.MONGO_URI,
    ACCESS_TOKEN_SCERET: process.env.ACCESS_TOKEN_SCERET,
    REFRESH_TOKEN_SCERET : process.env.REFRESH_TOKEN_SCERET,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY
}

export default config