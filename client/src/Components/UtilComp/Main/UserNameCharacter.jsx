import React from 'react'

export default function UserNameCharacter({height}) {
  return (
    <>
        {sessionStorage.getItem("fullName")&&<p className='font-Quicksand text-xl cursor-pointer aspect-square flex items-center justify-center bg-green-700 rounded-full text-white ' style={{height:height}}>{sessionStorage.getItem("fullName")[0].toUpperCase()}</p>}
    </>
  )
}
