const APIerror = require("./APIerror")
const jwt=require("jsonwebtoken")
const verifyJWT=(req,res,next)=>{
    //cookie
    try {
        console.log(req?.cookies,req.header("Authorization"))
        const token=req?.cookies?.accessToken || req.header("Authorization").replace("Bearer ","") //replace Bearer_ with ""
        console.log(token)
        if(!token){
            throw new APIerror(400,{accessToken:true},"Unauthorized")
        }
        const data=jwt.verify(token,process.env.ACCESS_SECRET_KEY)
        req.user=data
        next()
    } catch (error) {
        throw new APIerror(400,{accessToken:true},"Unauthorized")
    }
}
module.exports=verifyJWT