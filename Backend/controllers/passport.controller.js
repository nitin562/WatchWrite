const passport = require("passport");
const User = require("../models/user.models");
const githubStrategy = require("passport-github2").Strategy;

const InitPassport = () => {
  passport.use(
    new githubStrategy(
      {
        clientID: process.env.GITCLIENT,
        clientSecret: process.env.GITSECRET,
        callbackURL: process.env.GITCALLBACK,
      },
      async function (accessToken, RefreshToken, profile, done) {
        try {
          
          const {id,login,name,avatar_url,email}=profile._json
          let findUser=await User.findOne({GitId:id})
          console.log(findUser)
          if(findUser){
            console.log("Accound Found",findUser)
            return done(null, findUser);
          }
          console.log(id,login,name,avatar_url,email)
          
          findUser=await User.create({userName:login+id,GitId:id,GithubUsername:login,fullName:name,email:email||"undefined",avatar:avatar_url,password:Math.floor(Math.random()*1000+100090)})
          console.log("Account Created",findUser)
          return done(null, findUser);
        } catch (error) {
            console.log(error)
            return done(error,null);
        }
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
};
module.exports = {passport,InitPassport};
