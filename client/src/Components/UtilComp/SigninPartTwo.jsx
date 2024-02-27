import React from 'react'
import avatar from "../../../public/avatar.png"
import add from "../../../public/add.png"
export default function SigninPartTwo() {
  return (
    <div className='w-screen h-screen bg-slate-800/90 bg-center bg-cover flex justify-center items-center before:bg-LoginBG before:bg-center before:bg-cover before:absolute before:content-[""] before:w-screen before:h-screen before:inset-0 before:-z-10'>
      <div className="w-[90%] h-[38rem] p-1 flex flex-col mt-4">
        {/* layout */}
        <header className='w-full bg-rose-500 h-16'>
          <img src={avatar} alt="avatar" className='h-[90%] bg-slate-800 object-cover rounded-full relative top-8 left-8 border-2 border-white cursor-pointer ' />
        </header>
        {/* coverimage */}
        <div className='w-full h-[15rem] border-t-2 border-t-white bg-CoverImage bg-cover bg-center flex justify-end items-end'>
          <button className='mr-8 mb-4 h-16 rounded-lg px-2'><img src={add} className='h-full  object-contain bg-slate-800 rounded-full' alt="add" /></button>
        </div>
      </div>
    </div>
  )
}
