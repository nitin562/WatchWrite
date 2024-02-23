const { v2 : cloudinary } =require("cloudinary");
const fs=require("fs")
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//method-give path
const uploadToCloudinary = async (localPath) => {
  try {
    if (!localPath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localPath)
    return response;
  } catch (error) {
    //remove the file from server
    console.log(error)
    fs.unlinkSync(localPath)
    return null;
  }
};

module.exports=uploadToCloudinary