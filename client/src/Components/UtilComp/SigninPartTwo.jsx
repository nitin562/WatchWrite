import React, { useRef, useState } from "react";

import add from "../../../public/add.png";
import ErrorPop from "./ErrorPop";
import { useNavigate } from "react-router-dom";
import { fetchup } from "../../Utils/FetchUp";
import { link } from "../../links";
import { createToast } from "../../Utils/ToastErrors";
export default function SigninPartTwo() {
  const [avatarImg, setavatarImg] = useState(
    sessionStorage.getItem("avatar") || null
  );
  const [coverImg, setCoverImg] = useState(sessionStorage.getItem("cover"));
  const nav = useNavigate();
  const [enableUpload, setenableUpload] = useState(false);
  const [Toasts, setToasts] = useState([]);
  const avatarRef = useRef();
  const coverImgRef = useRef();
  
  const onAvatarClick = () => {
    setavatarImg(null);
    avatarRef.current.click();
  };
  const onloadAvatar = (e) => {
    setenableUpload(false);
    const file = e.target.files[0];
    if (!file) {
      return null;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setavatarImg(reader.result);
      setenableUpload(true);
    };
    reader.readAsDataURL(file);
  };
  const onloadCover = (e) => {
    setenableUpload(false);
    const file = e.target.files[0];
    if (!file) {
      return null;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setCoverImg(reader.result);
      setenableUpload(true);
    };
    reader.readAsDataURL(file);
  };
  const UploadImages = async () => {
    if (
      avatarImg === sessionStorage.getItem("avatar") &&
      coverImg === sessionStorage.getItem("cover")
    ) {
      //no change
      nav("/");
    } else {
      //upload
      const formData = new FormData();
      if (avatarImg !== sessionStorage.getItem("avatar")) {
        formData.append("avatar", avatarRef.current.files[0]);
      }
      if (coverImg !== sessionStorage.getItem("cover")) {
        formData.append("coverImage", coverImgRef.current.files[0]);
      }
      console.log(formData.get("avatar"), formData.get("coverImage"));
      const result = await fetchup(link.images, "POST",setToasts, {}, formData);
      console.log(result);
      if (result.success) {
        sessionStorage.setItem("avatar", result.data.avatar);
        sessionStorage.setItem("cover", result.data.coverImage);
        setavatarImg(result.data.avatar);
        setCoverImg(result.data.coverImage);
        nav("/");
      } else {
        //error
        createToast(result?.message||"Server down, Try again later",setToasts)
      }
    }
  };
  return (
    <div className='w-screen h-screen bg-slate-800/90 bg-center bg-cover flex justify-center items-center before:bg-LoginBG before:bg-center before:bg-cover before:absolute before:content-[""] before:w-screen before:h-screen before:inset-0 before:-z-10'>
      <ErrorPop popArr={Toasts} />

      <div className="w-[90%] h-[38rem] p-1 flex flex-col mt-4">
        {/* layout */}
        <header className="w-full bg-rose-500 h-16">
          <img
            src={avatarImg}
            alt="avatar"
            className="h-[90%] bg-slate-800 object-cover aspect-square rounded-full relative top-8 left-8 border-2 border-white cursor-pointer "
            onClick={onAvatarClick}
          />
        </header>
        {/* coverimage */}
        <div
          className="w-full h-[15rem] border-t-2 border-t-white  bg-cover bg-no-repeat bg-center aspect-square flex justify-end items-end"
          style={coverImg && { backgroundImage: `url(${coverImg})` }}
        >
          <button className="mr-8 mb-4 h-16 rounded-lg px-2">
            <img
              src={add}
              className="h-full  object-contain bg-slate-800 rounded-full"
              alt="add"
              onClick={() => {
                setCoverImg(null);
                coverImgRef.current.click();
              }}
            />
          </button>
        </div>
        <input
          ref={avatarRef}
          onChange={onloadAvatar}
          className="absolute hidden"
          type="file"
        />
        <input
          ref={coverImgRef}
          onChange={onloadCover}
          className="absolute hidden"
          type="file"
        />
        <div className="w-full flex justify-end mt-8 px-4">
          <button
            disabled={!enableUpload}
            className="w-fit font-Quicksand border-2 px-3 rounded-md py-1 text-white hover:bg-gray-700 hover:border-blue-400"
            onClick={UploadImages}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
