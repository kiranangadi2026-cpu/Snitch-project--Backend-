

export function authenticate(req, res, next){
    const accessToken = req.headers.Authorization?.split(" ")[1]

    if(!accessToken){
        return res.status(400).json({
            message:"Accesstoken not found in the request header"
        })
    }

    try {
        const decoded = readAccessToken(accessToken)

        req.user = decoded

        next()

    } catch (err) {
        
        return res.status(401).json({
            message:"Something went wrong or accessToken not found"
        })

    }

}