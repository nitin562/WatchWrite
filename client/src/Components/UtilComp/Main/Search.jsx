import React from 'react'
import searchPng from "/search.png"
export default function Search() {
  return (
    <div className='flex h-full gap-x-4 w-1/2  items-center'>
        <input type="text" className="flex-1 h-3/4 rounded-full bg-transparent border-2 outline-none text-white font-Abel indent-4 text-2xl border-gray-400 focus:border-blue-400"/>
        <img src={searchPng} className='cursor-pointer hover:border-b-black border-2 border-transparent active:border-b-sky-400 p-2 aspect-square invert h-3/4 ' alt="Search logo" />
    </div>
  )
}
