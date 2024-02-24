const asyncHandler=(func)=>{return async(req,res,next)=>{
    try {
        await func(req,res,next)
    } catch (error) {
        //error object APIerror
        //message, name,statusCode,success
        return res.status(error.statusCode||500).json({success:error.success,message:error.message,name:error.name},)
    }
}}
module.exports=asyncHandler