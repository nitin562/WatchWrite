import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./UtilComp/FormInput";
import emailIcon from "../../public/emailIcon.png";
import showPassword from "../../public/eye.png";
import NoPassword from "../../public/invisible.png";
import LoginWithOuth from "./LoginWithOuth";
export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleVisiblity=()=>{
    setPasswordVisible(prev=>!prev)
  }
  return (
    <div className='w-screen h-screen bg-slate-800/90 bg-center bg-cover flex justify-center items-center before:bg-LoginBG before:bg-center before:bg-cover before:absolute before:content-[""] before:w-screen before:h-screen before:inset-0 before:-z-10'>
      <div className="w-[90%] h-[30rem] p-1 md:w-[40%]  flex flex-col ">
        <p className="w-full text-center text-white text-3xl font-Quicksand mt-4 first-letter:text-emerald-400">
          Welcome Back
        </p>
        <div className="w-full m-auto flex flex-col items-center gap-y-10">
          <FormInput type="email" holder="Enter email" icon={emailIcon} errState={false} error="Email not valid" />
          <FormInput
            type={passwordVisible?"text":"password"}
            holder="Enter Password"
            icon={passwordVisible?showPassword:NoPassword}
            func={toggleVisiblity}
            errState={false} error="Email not valid"
          />
          <div className="w-[90%] flex justify-between  gap-x-2">
            <Link to="/sign" className="font-Arsenal text-gray-300 text-[0.9rem] group cursor-pointer">New User? <span className="ml-1 text-gray-500 group-hover:text-orange-300">Register</span></Link>
            <button className="font-Quicksand border-2 px-3 rounded-md py-1 text-white hover:bg-gray-700 hover:border-blue-400">Login</button>
          </div>
          {/* Login with Oauth */}
          <div className="w-[90%] flex items-center gap-x-2">
            <div className="w-[40%] h-0 border-2"></div>
            <span className="w-[20%] text-center font-Quicksand text-emerald-400 text-2xl">OR</span>
            <div className="w-[40%] h-0 border-2"></div>
          </div>
          <LoginWithOuth title="Login with"/>
        </div>
      </div>
    </div>
  );
}
