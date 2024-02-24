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
    userName,fullName,email,password,avatar:responseAvatar.url,coverImage:responseAvatar?.url||""
  })
  return res.status(200).send(new APIresponse(200,SaveToDB,"Registered"))
})

const Login = async (req, res) => {
  try {

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ success: -1, error: error.mapped() });
    }
    //finding email
    const { email } = req.params;
    const client = await User.findOne({ email });
    if (!client) {
      return res.status(400).json({ success: -2, error: "Not Registered" });
    }
    //account found
    const { password } = req.params;
    const checkPassword = await verifyPassword(password, client.password);
    if (!checkPassword) {
      //means password is wrong
      return res.status(400).json({ success: -3, error: "Password is wrong" });
    }
    //now password is matched so create token
    const token = createToken(client._id);
    res.cookie(token, {
      httpOnly: true,
      sameSite: true,
      secure: true,
      domain: process.env.base,
    });
    return res.status(200).json({ success: 1, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ sucess: 0, error });
  }
};
module.exports = { Register, Login };
