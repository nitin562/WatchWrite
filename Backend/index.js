const express=require("express")
const path=require("path")
const cookieParser=require("cookie-parser")
const connectToDb  = require("./DB.js")
const GitHubStrategy=require('passport-github2').Strategy
require("dotenv").config({path:"./.env"})
const app=express()
const cors=require("cors")
const session=require("express-session")
const passport = require("passport")
const { InitPassport } = require("./controllers/passport.controller.js")
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173","https://github.com"],
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname+"/public")))
app.use(passport.initialize())
InitPassport()
app.set("view engine","ejs")

app.use("/api/auth",require("./API/user.api.js"))

connectToDb()

app.listen(8000,()=>{
    console.log("server start at 8000")
})