const { validationResult } = require("express-validator");
const User = require("../models/user.models.js");
const asyncHandler  = require("../Utils/asyncHandler.js");
const APIerror = require("../Utils/APIerror.js");
const APIresponse=require("../Utils/APIresponse.js")
const uploadToCloudinary = require("../Utils/Cloudinary.config.js");
const Register = asyncHandler(async function(req,res){
  console.log(req.body)
  const DataInValids=validationResult(req)
  if(!DataInValids.isEmpty()){
    throw new APIerror(400,DataInValids.mapped(),"Client Side error")
  }
  //no client error now
  //check client existence
  const {userName,fullName,email,password}=req.body
  //all essentials are destructured
  const ClientExisted=await User.findOne({$or:[{email},{userName}]})//both should be unique
  if(ClientExisted){
    throw new APIerror(400,{userName:ClientExisted.userName===userName,email:ClientExisted.email===email},"No Unique")
    return
  }
  //Not Existed
  //file upload
  console.log(req.files)
  if(!req.files || !req.files.avatar || req.files.avatar.length===0){
    throw new APIerror(400,{avatar:{msg:"Avatar must be provided"}},"Client Side error")
  }
  const Avatar=req.files.avatar[0].path //it is always present as it validates
  let CoverImage
  if(req.files && req.files.coverImage && req.files.coverImage.length>0){
    CoverImage=req.files.coverImage[0].path
  }
  
  //cloudinary
  const responseAvatar=await uploadToCloudinary(Avatar)
  const responseCoverImage=await uploadToCloudinary(CoverImage)
  //Save
  const SaveToDB=await User.create({
    userName,fullName,email,password,avatar:responseAvatar.url,coverImage:responseCoverImage?.url||""
  })
  return res.status(200).send(new APIresponse(200,SaveToDB,"Registered"))
})

const Login=asyncHandler(async(req,res)=>{
  const invalidData=validationResult(req)
  if(!invalidData.isEmpty()){
    throw new APIerror(400,DataInValids.mapped(),"Client Side error")
  }
  //data is correct
  //check the client
  const {email,userName,password}=req.query
  const client=await User.findOne({$or:[{email},{userName}]})
  if(!client){
    throw new APIerror(400,{client:false},"No account")
  }
  //found
  const verifyPassword=await client.ComparePassword(password)
  if(!verifyPassword){
    throw new APIerror(400,{password:true},"Wrong Password")
  }
  //verified
  const refreshtoken=client.createRefreshToken()
  const accessToken=client.createAccessToken()
  //save this refresh token to db
  client.RefreshToken=refreshtoken
  const loginedUser=await client.save()
  const data=await User.findById(loginedUser._id).select("-password -RefreshToken")
  const options={
    httpOnly:true,
    secure:true,
    sameSite:true,
    domain:process.env.base
  }
  return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshtoken,options).send(new APIresponse(200,data,"Logined"))

})
const logout=asyncHandler(async(req,res)=>{
  const id=req.user._id
  const client=await User.findByIdAndUpdate(id,{$set:{RefreshToken:undefined}},{new:true})
  res.clearCookie("refreshToken")
  res.clearCookie("accessToken")
  return res.status(200).send(new APIresponse(200,client,"Logout"))
  
})
module.exports = { Register, Login,logout };
