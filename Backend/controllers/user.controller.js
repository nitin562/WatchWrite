const { validationResult } = require("express-validator");
const User = require("../models/user.models");
const Register = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      //client side error
      return res.status(400).json({ success: -1, error: error.mapped() });
    }
    //checking email exist in db already or not
    const { email } = req.body;
    const client = await User.findOne({ email });
    if (client) {
      //already exist
      return res.status(200).json({ success: -2, msg: "Already registered" });
    }
    //means you need to register it
    //Hash the password
    const { password, name } = req.body;
    
    const Record = await User.create({
      userName: name,
      password,
      email,
    });
    const token = createToken(Record._id);
    res.cookie(token, {
      path: "/",
      domain: `${process.env.base}/api`,
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
    return res.status(200).json({ success: 1, token });
  } catch (error) {
    console.log(error);
    return res.status(500).status({ success: 0 });
  }
};
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
