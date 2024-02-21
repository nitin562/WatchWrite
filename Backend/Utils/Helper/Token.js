const jwt=require("jsonwebtoken")
const createToken=(data)=>{
    const payload={
        val:{
            data
        }
    }
    return jwt.sign(payload,process.env.secret)
}
const decodeToken=(token)=>{
     try {
        return jwt.verify(token,process.env.secret)
     } catch (error) {
        throw error
     }
}
module.exports={createToken,decodeToken}