const db = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new db.Schema(
  {
    userName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String, //url
      default: `${process.env.base}/people.png`,
    },
    coverImage: {
      type: String, //url
    },
    watchHistory: {
      type: [
        {
          type: db.Schema.Types.ObjectId,
          ref: "Video",
        },
      ],
    },
    RefreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//using hooks
//encrypt the password
userSchema.pre("save", async function (next) {
  //before save, do this
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//creating personal methods
//to compare password
userSchema.methods.ComparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
//to getToken
userSchema.methods.createAccessToken = function () {//accesstoken is used for taking permission from server to proceed the performance and enables security.
  return jwt.sign(
    {
      id: this._id,
      user: this.userName,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: process.env.ACCESS_EXPIRY }
  );
};
userSchema.methods.createRefreshToken = function () { //it is longlived token that is used to refresh the accesstoken if somehow accesstoken is expired but refresh token is still in client system
  return jwt.sign(
    {
      id: this._id
    },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: process.env.REFRESH_EXPIRY }
  );
};
//verify token

const User = db.model("User", userSchema);
module.exports = User;
