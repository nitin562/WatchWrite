const {validationResult}=require("express-validator");
const User = require("../models/user.models");
const { hashPassword } = require("../Utils/Helper/Password");
const { createToken } = require("../Utils/Helper/Token");
const Register = async (req, res) => {
  try {
    const error=validationResult(req);
    if(!error.isEmpty()){//client side error
        return res.status(400).json({success:-1,error:error.mapped()})
    }
    //checking email exist in db already or not
    const {email}=req.body
    const client=await User.findOne({email})
    if(client){
        //already exist
        return res.status(200).json({success:-2,msg:"Already registered"})
    }
    //means you need to register it 
    //Hash the password
    const {password,name}=req.body
    const HashedPassword=await hashPassword(password)
    const Record=await User.create({userName:name,password:HashedPassword,email})
    const token=createToken(Record._id)
    res.cookie(token,{path:"/",domain:`${process.env.base}/api`,httpOnly:true,secure:true,sameSite:true})
    return res.status(200).json({success:1,token})
    
  } catch (error) {
    console.log(error)
    return res.status(500).status({success:0})
  }
};
const Login = async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
}
module.exports = { Register,Login };
