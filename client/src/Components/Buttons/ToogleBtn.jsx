import React from 'react'

export default function ToogleBtn() {
  return (
    <div className='h-1/2 aspect-square flex flex-col justify-between mx-4 cursor-pointer group transition duration-200'>
        <div className='border-2 border-gray-400 w-full rounded-full group-hover:border-white'></div>
        <div className='border-2 border-gray-400 w-full rounded-full group-hover:border-white'></div> 
        <div className='border-2 border-gray-400 w-full rounded-full group-hover:border-white'></div>
 </div>
  )
}
