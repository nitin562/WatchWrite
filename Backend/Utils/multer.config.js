const multer=require("multer")
const Storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname+"-"+Date.now())
    }
})
const upload=multer({storage:Storage})
module.exports=upload