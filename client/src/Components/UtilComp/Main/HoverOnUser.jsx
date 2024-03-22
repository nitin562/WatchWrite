import React from 'react'
import UserNameCharacter from './UserNameCharacter'

export default function HoverOnUser({width}) {
  return (
    <div className='text-white flex flex-col' style={{width:width}}>
        <div className='w-full justify-center flex h-20 p-4'>
            <UserNameCharacter height="80%"/>
            <div className='flex flex-col flex-1 px-2 h-fit items-start  '>
                {sessionStorage.getItem("fullName")&&<p className='text-xl font-Quicksand'>{sessionStorage.getItem("fullName").toUpperCase()}</p>}
                {sessionStorage.getItem("email")&&<p className='text-md font-Barlow text-gray-400'>nitin@gmail.com</p>}
                <p className='text-sky-500 font-Jost hover:text-yellow-200 cursor-pointer'>View Your Channel</p>
            </div>
        </div>
        
    </div>
  )
}
