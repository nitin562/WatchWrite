import React from 'react'
import upload from "/upload.png"
import notificationPng from "/bell.png"
import HoverToogle from './HoverToogle'
import UserNameCharacter from './UserNameCharacter'
import HoverOnUser from './HoverOnUser'
export default function Icons() {
  return (
    <div className='w-[50%] flex h-full justify-end items-center gap-x-4 px-4' >
        <img src={upload} alt="Upload" className=' p-2 h-3/4 aspect-square  cursor-pointer hover:border-b-emerald-300 border-2 border-transparent' />
        <img src={notificationPng} alt="notification" className='p-2 h-3/4 aspect-square cursor-pointer hover:border-b-emerald-300 border-2 border-transparent' />
        <HoverToogle displayComponent={<UserNameCharacter height="100%"/>} innerComponent={<HoverOnUser width="15rem"/>} height="10rem" left="-13rem"/>
    </div>
  )
}
