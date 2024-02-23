const express=require("express")
const path=require("path")
const connectToDb  = require("./DB.js")
require("dotenv").config({path:"./.env"})
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname+"/public")))
app.use("/api/auth",require("./API/user.api.js"))

connectToDb()

app.listen(8000,()=>{
    console.log("server start at 8000")
})