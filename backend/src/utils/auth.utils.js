import jwt from "jsonwebtoken"
import config from "../config/config"

export function createAccessToken({userId, role}){

    const accessToken = jwt.sign({userId, role}, config.ACCESS_TOKEN_SCERET, {expiresIn:"15M"})
    return accessToken

} 
export function createRefreshToken({userId, role}){

    const refreshToken = jwt.sign({userId, role}, config.REFRESH_TOKEN_SCERET, {expiresIn:"7D"})
    return refreshToken

} 