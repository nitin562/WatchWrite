const {check} = require("express-validator")
const express=require("express")
const { Register, Login } = require("../controllers/user.controller")
const Router=express.Router()
//success=-1 error from client
//success=0 error from server
//success=1 correct
//success=-2 already registered
//1.Sign
Router.post("/sign",[check("name","Name must be of atleast 3 characters").isLength({min:3}),check("email","Email is not valid").isEmail(),check("password","Password must be of atleast 6 characters").isLength({min:6})],Register)

//2.Login
Router.get("/login",[check("email","Email is invalid").isEmail(),check("password","Password must be of atleast 6 characters").isLength({min:6})],Login)

module.exports=Router