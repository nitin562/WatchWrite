const mongoose=require("mongoose")
const connectToDb=async()=>{
    try {
        
        await mongoose.connect(`${process.env.uri}/${process.env.database}`)
        console.log("Connected to db")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports=connectToDb