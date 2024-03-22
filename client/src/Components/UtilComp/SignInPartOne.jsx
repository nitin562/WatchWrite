import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import user from "../../../public/user.png";
import emailIcon from "../../../public/emailIcon.png";
import showPassword from "../../../public/eye.png";
import NoPassword from "../../../public/invisible.png";
import LoginWithOuth from "../LoginWithOuth";
import { contextUse } from "../../Context/ContextProvider";

import ErrorPop from "./ErrorPop";
import { fetchup } from "../../Utils/FetchUp";
import { link } from "../../links";
import { ErrorHandlingForClientSideError } from "../../Utils/ClientSideErrorHandler";
import { createToast } from "../../Utils/ToastErrors";
export default function SignInPartOne({
  passwordVisible,
  toggleVisiblity,
}) {
  const globalStates = contextUse();
  const {
    userName,
    setuserName,
    email,
    setFullName,
    setEmail,
    fullName,
    password,
    setPassword,
    RePassword, setRePassword
  } = globalStates;
  const [errors, seterrors] = useState({})
  const [toasts, setToasts] = useState([]);
  const nav=useNavigate()
  
  const ErrorHandlingForUnique=(result)=>{
    if(result.message.email){
      //true
      seterrors(prev=>{
        return {...prev,"email":"Email is already used"}
      })
    }
    if(result.message.userName){
      seterrors(prev=>{
        return {...prev,"userName":"User Name is already used"}
      })
    }
  }
  const SendData=async()=>{
    const formData=new FormData()
    formData.append("userName",userName)
    formData.append("fullName",fullName)
    formData.append("password",password)
    formData.append("email",email)
    const result=await fetchup(link.sign,"POST",setToasts,{},formData)
    console.log(result)
    if(result.success===true){
      const {userName,fullName,email,avatar,coverImage}=result.data.data
      sessionStorage.setItem("userName",userName)
      sessionStorage.setItem("fullName",fullName)
      sessionStorage.setItem("email",email)
      sessionStorage.setItem("avatar",avatar)
      sessionStorage.setItem("cover",coverImage)


      nav("/images")
    }
    else{
      if(result.name==="Client Side error"){
        ErrorHandlingForClientSideError(result,seterrors,["userName","fullName","email","password"])
        
      }
      else if(result.name==="No Unique"){
        ErrorHandlingForUnique(result)
      }
      else{
        console.log("Server error", result)
        createToast("Server Side Error occured, try again later",setToasts)
      }
    }

  }
  const Register=async()=>{
    seterrors({})
    if(email != "" && userName != "" && fullName != "" && password!="" && RePassword!=""){
      if(password === RePassword){
        await SendData()
        return true;
      }
      seterrors(prev=>{
        return {...prev,"RePassword":"Password does not match"}
        
      })
      return false
    }
    showToast("All Fields are required..")
    return false
  }
  return (
    <>
      <ErrorPop popArr={toasts}/>
      <p className="w-full text-center text-white text-4xl font-Quicksand mb-4 first-letter:text-emerald-400">
        Join Us
      </p>
      <div className="w-full m-auto flex flex-col items-center gap-y-10">
        <FormInput
       
          type="text"
          holder="Enter User Name"
          icon={user}
          error={errors.userName}
          state={userName}
          setstate={setuserName}
        />
        <FormInput
 
          type="text"
          holder="Enter Full Name"
          icon={user}
          error={errors.fullName}
          state={fullName}
          setstate={setFullName}
        />

        <FormInput

          type="email"
          holder="Enter email"
          icon={emailIcon}
          error={errors.email}
          state={email}
          setstate={setEmail}
        />
        <FormInput
          type={passwordVisible ? "text" : "password"}
          holder="Enter Password"
          icon={passwordVisible ? showPassword : NoPassword}
          func={toggleVisiblity}
          error={errors.password}
          state={password}
          setstate={setPassword}
        />
        <FormInput
      
          type="password"
          holder="Enter Password again"
          icon={NoPassword}
          error={errors.RePassword}
          state={RePassword}
          setstate={setRePassword}
        />
        <div className="w-[90%] flex justify-between  gap-x-2">
          <Link
            to="/login"
            className="font-Arsenal text-gray-300 text-[0.9rem] group cursor-pointer"
          >
            Already a User?{" "}
            <span className="ml-1 text-gray-500 group-hover:text-orange-300">
              Login
            </span>
          </Link>
          <button
            onClick={Register}
            className="font-Quicksand border-2 px-3 rounded-md py-1 text-white hover:bg-gray-700 hover:border-blue-400"
          >
            Register
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
        <LoginWithOuth title="Register with" />
      </div>
    </>
  );
}
