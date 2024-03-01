const { check, query } = require("express-validator");
const express = require("express");
const upload = require("../Utils/multer.config.js");
const { Register, Login, logout, RefreshToken } = require("../controllers/user.controller");
const verifyJWT = require("../Utils/Auth.middleware.js");
const Router = express.Router();
//success=-1 error from client
//success=0 error from server
//success=1 correct
//success=-2 already registered in sign or not registered in Login
//success=-3 password is wrong in login
//1.Sign
// upload.fields([
//   {
//     name: "avatar",
//     maxCount: 1,
//   },
//   {
//     name: "coverImage",
//     maxCount: 1,
//   },
// ])
Router.post(
  "/sign",
  upload.none()
  ,
  [
    check("userName", "Name must be of atleast 3 characters").isLength({
      min: 3,
    }),
    check("fullName", "Fullname must be atleast of 3 characters").isLength({
      min: 3,
    }),
    check("email", "Email is not valid").isEmail(),
    check("password", "Password must be of atleast 6 characters").isLength({
      min: 6,
    }),
  ],

  Register
);

//2.Login
Router.get(
  "/login",
  [
    query("email", "Email is invalid").if(query("userName").not().exists()).isEmail(),
    query("userName", "userName must be of atleast 3 characters").if(query("email").not().exists()).isLength({min:3}),
    query("password", "Password must be of atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  Login
);
//3.Refresh the token
Router.get("/refresh",RefreshToken)
//4. Logout
Router.get("/logout",verifyJWT,logout)
module.exports = Router;
