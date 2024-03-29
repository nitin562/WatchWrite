import React from 'react'
import githubLogo from "../../public/githubLogo.png"
import { link } from '../links'


export default function LoginWithOuth({title}) {
  const onGithubLogin=async()=>{
    window.open(link.githubLogin,"_self")
  }
  return (
    <div className='w-[90%] cursor-pointer group flex h-[1.5rem] justify-center items-center gap-x-3' onClick={onGithubLogin}>
        <p className='text-gray-200 transition duration-300 text-xl font-Jost group-hover:text-pink-500'>{title}</p>
        <img src={githubLogo} className='object-contain h-full invert group-hover:bg-emerald-300 transition duration-300 group-hover:invert-0 rounded-full' alt="logo" />
    </div>
  )
}
