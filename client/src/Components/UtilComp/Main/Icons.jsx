import React from 'react'
import upload from "/upload.png"
import notificationPng from "/bell.png"
export default function Icons() {
  return (
    <div className='w-[50%] flex h-full justify-end items-center gap-x-4'>
        <img src={upload} alt="Upload" className=' p-2 h-3/4 aspect-square  cursor-pointer hover:border-b-emerald-300 border-2 border-transparent' />
        <img src={notificationPng} alt="notification" className='p-2 h-3/4 aspect-square cursor-pointer hover:border-b-emerald-300 border-2 border-transparent' />
        <p className='font-Quicksand text-3xl text-red-500'>{sessionStorage.getItem("fullName")[0].toUpperCase()}</p>
    </div>
  )
}
