import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { link } from "../links";
import { fetchup } from "../Utils/FetchUp";
import Nav from "./UtilComp/Main/Nav";
export default function Main() {
  const nav = useNavigate();
  const location = useLocation();
  const queryparams = new URLSearchParams(location.search);
  const fetchLogin = async (id) => {
    const result = await fetchup(`${link.getData}?id=${id}`, "GET");
    console.log(result)
    if (result.success) {
      const { userName, fullName, email, avatar, coverImage,GitId,GithubUsername } =
        result.data.data;
        console.log(userName)
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("fullName", fullName);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("avatar", avatar);
      sessionStorage.setItem("cover", coverImage);
      sessionStorage.setItem("GitId", GitId);
      sessionStorage.setItem("GitUser", GithubUsername);
      nav("/");
    }
    else{
      nav("/login")
    }
  };
  useEffect(() => {
    console.log(queryparams.get("server"));
    if (queryparams.get("server")) {
      fetchLogin(queryparams.get("server"));
    } else if (
      !sessionStorage.getItem("userName") &&
      !sessionStorage.getItem("id")
    ) {
      nav("/login")
    }
  }, []);
  return <div className="w-screen h-screen bg-stone-900">
    <Nav/>
  </div>;
}
