const jwt = require("jsonwebtoken")
const isAuthenticated = async(req,res,next)=>{
    try{
        const token = req.cookies?.token;
    if(!token){
        return res.status(401).json({
            message:"User not authenticated",
            succes:false
        })
    }
    const decode = await jwt.verify(token,process.env.SECRET_KEY);
    if(!decode){
        return res.status(401).json({
            message:"invalid",
            succes:false
        })
    }
    req.id=decode.userId;
    next();

    }catch(err){
        console.log(err)
    }
}

module.exports={
    isAuthenticated
}