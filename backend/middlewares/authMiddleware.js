const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => { //middleware que verifica la validez del token enviado en
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({error: "No autorizado: se requiere token de acceso"})
    }
    
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next()
    }catch(err){
        if(err.name === "TokenExpiredError"){
            return res.status(401).json({error: "Token has expired"})
        }
        if(err.name === "JsonWebTokenError"){
            return res.status(401).json({error: "Invalid Token"})
        }
        return res.status(err.status).json({error: "Token verification failed"})
    }
}

module.exports = {authMiddleware} 