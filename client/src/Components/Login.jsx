import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./UtilComp/FormInput";
import emailIcon from "../../public/emailIcon.png";
import user from "../../public/user.png";

import showPassword from "../../public/eye.png";
import NoPassword from "../../public/invisible.png";
import LoginWithOuth from "./LoginWithOuth";
import { fetchup } from "../Utils/FetchUp";
import { contextUse } from "../Context/ContextProvider";
import { link } from "../links";
import { ErrorHandlingForClientSideError } from "../Utils/ClientSideErrorHandler";
import ErrorPop from "./UtilComp/ErrorPop";
import { createToast } from "../Utils/ToastErrors";
export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isloginWithEmail, setisloginWithEmail] = useState(true)
  const [Toasts, setToasts] = useState([])
  const [errors, seterrors] = useState({})
  const globals = contextUse();
  const { email, setEmail, password, setPassword,userName,setuserName } = globals;
  const toggleVisiblity = () => {
    setPasswordVisible((prev) => !prev);
  };

  const nav=useNavigate()
  const login = async () => {
    seterrors({})
    let url=`${link.login}?email=${email}&password=${password}`
    if(isloginWithEmail===false){
      url=`${link.login}?userName=${userName}&password=${password}`
    }
    const result = await fetchup(
      url,
      "GET",setToasts
    );
    console.log(result);
    if (result.success) {
      const { userName, fullName, email, avatar, coverImage,GitId,GithubUsername } =
        result.data.data;
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("fullName", fullName);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("avatar", avatar);
      sessionStorage.setItem("cover", coverImage);
      sessionStorage.setItem("GitId", GitId);
      sessionStorage.setItem("GitUser", GithubUsername);
    }
    else{
      if(result.name==="Client Side error"){
        ErrorHandlingForClientSideError(result,seterrors,["userName","email","password"])
      }
      else if(result.name==="No account"){
        if(isloginWithEmail){
          seterrors(prev=>{
            return {...prev,"email":"No account is associated with this email"}
          })
        }
        else{
          seterrors(prev=>{
            return {...prev,"userName":"No account is associated with this username"}
          })
        }
      }
      else{
        createToast(result.message||"Server is down, try again later",setToasts)
      }
    }
  };
  useEffect(()=>{
    if(sessionStorage.getItem("email")){
      nav("/")
    }
  },[])
  return (
    <div className='w-screen h-screen bg-slate-800/90 bg-center bg-cover flex justify-center items-center before:bg-LoginBG before:bg-center before:bg-cover before:absolute before:content-[""] before:w-screen before:h-screen before:inset-0 before:-z-10'>
      <ErrorPop popArr={Toasts}/>
      <div className="w-[90%] h-[30rem] p-1 md:w-[40%]  flex flex-col ">
        <p className="w-full text-center text-white text-3xl font-Quicksand mt-4 first-letter:text-emerald-400">
          Welcome Back
        </p>
        <div className="w-full m-auto flex flex-col items-center gap-y-10">
          <FormInput
            type={isloginWithEmail?"email":"text"}
            holder={isloginWithEmail?"Enter Email":"Enter user name"}
            icon={isloginWithEmail?emailIcon:user}
            error={isloginWithEmail?errors.email:errors.userName}
            state={isloginWithEmail?email:userName}
            setstate={isloginWithEmail?setEmail:setuserName}
            
          />
          <FormInput
            type={passwordVisible ? "text" : "password"}
            holder="Enter Password"
            icon={passwordVisible ? showPassword : NoPassword}
            func={toggleVisiblity}
            state={password}
            setstate={setPassword}
            error={errors.password}
          />
          <div className="w-[90%] flex justify-between  gap-x-2">
            <Link
              to="/sign"
              className="font-Arsenal text-gray-300 text-[0.9rem] group cursor-pointer"
            >
              New User?{" "}
              <span className="ml-1 text-gray-500 group-hover:text-orange-300">
                Register
              </span>
            </Link>
            <button
              className="font-Quicksand border-2 px-3 rounded-md py-1 text-white hover:bg-gray-700 hover:border-blue-400"
              onClick={login}
            >
              Login
            </button>
          </div>
          {/* Login with Oauth */}
          <div className="w-[90%] flex items-center gap-x-2">
            <div className="w-[40%] h-0 border-2"></div>
            <span className="w-[20%] text-center font-Quicksand text-emerald-400 text-2xl">
              OR
            </span>
            <div className="w-[40%] h-0 border-2"></div>
          </div>
          <LoginWithOuth title="Login with" />
        </div>
      </div>
      <button className="absolute right-4 bottom-4 font-Arsenal text-gray-300 text-[0.9rem] group cursor-pointer border-2 border-yellow-200 rounded-lg p-2 hover:bg-indigo-500/20" onClick={()=>setisloginWithEmail(prev=>!prev)}>Login By <span className="italic text-yellow-300">Username</span></button>
    </div>
  );
}
