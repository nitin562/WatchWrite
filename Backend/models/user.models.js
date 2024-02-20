const db=require("mongoose")
const userSchema=new db.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:`${process.env.base}/people.png`
    }
},{timestamps:true})

const User=db.model("User",userSchema)
module.exports=User