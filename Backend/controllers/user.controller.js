const { validationResult } = require("express-validator");
const User = require("../models/user.models.js");
const asyncHandler = require("../Utils/asyncHandler.js");
const APIerror = require("../Utils/APIerror.js");
const APIresponse = require("../Utils/APIresponse.js");
const uploadToCloudinary = require("../Utils/Cloudinary.config.js");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { query } = require("express");
const Register = asyncHandler(async function (req, res) {
  console.log(req.body);
  const DataInValids = validationResult(req);
  if (!DataInValids.isEmpty()) {
    throw new APIerror(400, DataInValids.mapped(), "Client Side error");
  }
  //no client error now
  //check client existence
  const { userName, fullName, email, password } = req.body;
  //all essentials are destructured
  const ClientExisted = await User.findOne({ $or: [{ email }, { userName }] }); //both should be unique
  if (ClientExisted) {
    throw new APIerror(
      400,
      {
        userName: ClientExisted.userName === userName,
        email: ClientExisted.email === email,
      },
      "No Unique"
    );
    return;
  }

  const SaveToDB = await User.create({
    userName,
    fullName,
    email,
    password,
  });
  //verified
  const { refreshToken, accessToken, data } = await generateCredientals(
    SaveToDB
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: true,
    domain: process.env.domain,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .send(
      new APIresponse(
        200,
        { data, refreshToken, accessToken },
        "Registered and logined"
      )
    );
});
//for storing avatar and cover image
const SaveImages = asyncHandler(async (req, res) => {
  //Not Existed
  //file upload
  // if(!req.files || !req.files?.avatar || req.files.avatar.length===0){
  //   throw new APIerror(400,{avatar:{msg:"Avatar must be provided"}},"Client Side error")
  // }
  //cloudinary
  let responseAvatar = undefined;
  let responseCoverImage = undefined;

  if (req.files && req.files?.coverImage && req.files.coverImage.length > 0) {
    responseCoverImage = await uploadToCloudinary(req.files.coverImage[0].path);
  }
  if (req.files && req.files?.avatar && req.files.avatar.length > 0) {
    responseAvatar = await uploadToCloudinary(req.files.avatar[0].path);
  }

  //Save
  const id = req.user.id;
  const updateContent = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        avatar: responseAvatar?.url,
        coverImage: responseCoverImage?.url,
      },
    },
    { new: true }
  );
  return res
    .status(201)
    .send(new APIresponse(201, updateContent, "Images saved"));
});
const Login = asyncHandler(async (req, res) => {
  const invalidData = validationResult(req);
  if (!invalidData.isEmpty()) {
    throw new APIerror(400, invalidData.mapped(), "Client Side error");
  }
  //data is correct
  //check the client
  const { email, userName, password } = req.query;
  const client = await User.findOne({ $or: [{ email }, { userName }] });
  if (!client) {
    throw new APIerror(400, { client: false }, "No account");
  }
  //found
  const verifyPassword = await client.ComparePassword(password);
  if (!verifyPassword) {
    throw new APIerror(400, { password: true }, "Wrong Password");
  }
  //verified
  const { refreshToken, accessToken, data } = await generateCredientals(client);
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: true,
    domain: process.env.domain,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .send(new APIresponse(200, { data, refreshToken, accessToken }, "Logined"));
});
const logout = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const client = await User.findByIdAndUpdate(
    id,
    { $set: { RefreshToken: undefined } },
    { new: true }
  );
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  return res.status(200).send(new APIresponse(200, client, "Logout"));
});
const getData=asyncHandler(async (req,res)=>{
  if(!req.query["id"]){
    return res.status(400).send(new APIerror(400,"No id","Id issue"))
  }
  const id=req.query["id"]
  const client=await User.findById(id)
  if(!client){
    return res.status(400).send(new APIerror(400,"Not found","Technical issue"))
  }
  console.log("find",client)
  const { refreshToken, accessToken, data }=await generateCredientals(client)
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: true,
    domain: process.env.domain,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .send(new APIresponse(200, { data, refreshToken, accessToken }, "Logined"));
 
})
const RefreshToken = asyncHandler(async () => {
  //here we know, we dont have accessToken
  const RefreshToken = req?.cookies?.refreshToken || req.header("RefreshToken");
  if (!RefreshToken) {
    throw new APIerror(401, {}, "Unauthorized");
  }
  //now check the refreshToken
  let extractData;
  jwt.verify(RefreshToken, process.env.REFRESH_SECRET_KEY, (err, val) => {
    if (err) {
      throw new APIerror(401, {}, "Unauthorized");
    } else {
      extractData = val;
    }
  });
  //client
  const { id } = extractData;
  const client = await User.findById(id);
  if (!client) {
    throw new APIerror(401, {}, "Unauthorized");
  }
  //let create new token
  //but suppose the given refresh token is valid but not for your id, it is of other client then other client account will be given to you that is not good
  //check stored refreshtoken is equal to given refreshtoken
  if (client.RefreshToken !== RefreshToken) {
    throw new APIerror(401, {}, "Unauthorized");
  }
  //now create new access and refresh token
  const { refreshToken, accessToken, data } = generateCredientals(client);
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .send(new APIresponse(200, { data, accessToken }, "Refreshed"));
});

const GithubLogin=asyncHandler( (req,res)=>{
  console.log("click")
  
})
const gitSuccess=asyncHandler(async(req,res)=>{
  if(!req.user){
    res.render("index.ejs",{user:req.user,message:"Unsuccessful login/signup",status:0,baseUrl:process.env.FRONTEND})

  }
  console.log(req.user)
  res.render("index.ejs",{user:req.user,message:"Welcome to App",status:1,id:req.user._id,baseUrl:process.env.FRONTEND})
  })

// -----------------------------------------------------------------
// utils for current
const generateCredientals = async (client) => {
  const refreshToken = client.createRefreshToken();
  const accessToken = client.createAccessToken();
  //save this refresh token to db
  client.RefreshToken = refreshToken;
  const loginedUser = await client.save();
  const data = await User.findById(loginedUser._id).select(
    "-password -RefreshToken"
  );
  return { refreshToken, accessToken, data };
};
//------------------------------------------------------------------
module.exports = {GithubLogin,gitSuccess, Register, Login, logout, RefreshToken, SaveImages,getData };
