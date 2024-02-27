import React from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import user from "../../../public/user.png";
import emailIcon from "../../../public/emailIcon.png";
import showPassword from "../../../public/eye.png";
import NoPassword from "../../../public/invisible.png";
import LoginWithOuth from "../LoginWithOuth";
import { contextUse } from "../../Context/ContextProvider";
export default function SignInPartOne({
  passwordVisible,
  setNextBtn,
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
    resetPassword,
    setResetPassword,
  } = globalStates;
  return (
    <>
      <p className="w-full text-center text-white text-4xl font-Quicksand mb-4 first-letter:text-emerald-400">
        Join Us
      </p>
      <div className="w-full m-auto flex flex-col items-center gap-y-10">
        <FormInput
          type="text"
          holder="Enter User Name"
          icon={user}
          errState={false}
          error="Email not valid"
          state={userName}
          setstate={setuserName}
        />
        <FormInput
          type="text"
          holder="Enter Full Name"
          icon={user}
          errState={false}
          error="Email not valid"
          state={fullName}
          setstate={setFullName}
        />

        <FormInput
          type="email"
          holder="Enter email"
          icon={emailIcon}
          errState={false}
          error="Email not valid"
          state={email}
          setstate={setEmail}
        />
        <FormInput
          type={passwordVisible ? "text" : "password"}
          holder="Enter Password"
          icon={passwordVisible ? showPassword : NoPassword}
          func={toggleVisiblity}
          errState={false}
          error="Email not valid"
          state={password}
          setstate={setPassword}
        />
        <FormInput
          type="password"
          holder="Enter Password again"
          icon={NoPassword}
          errState={false}
          error="Email not valid"
          state={resetPassword}
          setstate={setResetPassword}
        />
        <div className="w-[90%] flex justify-between  gap-x-2">
          <Link
            to="/"
            className="font-Arsenal text-gray-300 text-[0.9rem] group cursor-pointer"
          >
            Already a User?{" "}
            <span className="ml-1 text-gray-500 group-hover:text-orange-300">
              Login
            </span>
          </Link>
          <Link
            to="/images"
            className="font-Quicksand border-2 px-3 rounded-md py-1 text-white hover:bg-gray-700 hover:border-blue-400"
          >
            Next
          </Link>
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
