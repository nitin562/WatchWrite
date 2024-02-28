import React, { useRef, useState } from "react";
import avatar from "../../../public/avatar.png";
import add from "../../../public/add.png";
export default function SigninPartTwo() {
  const [avatarImg, setavatarImg] = useState(avatar||null);
  const [coverImg, setCoverImg] = useState(null);

  const avatarRef = useRef();
  const coverImgRef = useRef();
  const onAvatarClick = () => {
    avatarRef.current.click();
  };
  const onloadAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return null;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setavatarImg(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const onloadCover = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return null;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setCoverImg(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className='w-screen h-screen bg-slate-800/90 bg-center bg-cover flex justify-center items-center before:bg-LoginBG before:bg-center before:bg-cover before:absolute before:content-[""] before:w-screen before:h-screen before:inset-0 before:-z-10'>
      <div className="w-[90%] h-[38rem] p-1 flex flex-col mt-4">
        {/* layout */}
        <header className="w-full bg-rose-500 h-16">
          <img
            src={avatarImg || avatar}
            alt="avatar"
            className="h-[90%] bg-slate-800 object-cover aspect-square rounded-full relative top-8 left-8 border-2 border-white cursor-pointer "
            onClick={onAvatarClick}
          />
        </header>
        {/* coverimage */}
        <div
          className="w-full h-[15rem] border-t-2 border-t-white bg-CoverImage bg-cover bg-no-repeat bg-center aspect-square flex justify-end items-end"
          style={coverImg && { backgroundImage: `url(${coverImg})` }}
        >
          <button className="mr-8 mb-4 h-16 rounded-lg px-2">
            <img
              src={add}
              className="h-full  object-contain bg-slate-800 rounded-full"
              alt="add"
              onClick={() => coverImgRef.current.click()}
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
          <button className="w-fit font-Quicksand border-2 px-3 rounded-md py-1 text-white hover:bg-gray-700 hover:border-blue-400">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
