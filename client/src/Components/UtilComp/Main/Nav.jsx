import React from 'react'
import ToogleBtn from '../../Buttons/ToogleBtn'
import Search from './Search'
import Icons from './Icons'

export default function Nav() {
  return (
    <div className='w-full h-16 flex items-center'>
        <div className='h-3/4 w-[30%] flex items-center gap-x-4'>
            <ToogleBtn/>
            <p className='text-white hidden md:text-2xl md:block text-xl  font-Oxygen drop-shadow-[0_0_0.5rem_#fff] select-none first-letter:text-emerald-400 '>Watch Write</p>
            <p className='text-white md:hidden text-2xl font-Oxygen drop-shadow-[0_0_0.5rem_#fff] select-none first-letter:text-emerald-400 '>W2</p>
        </div>
        <div className='flex-1 flex h-full'>
            <Search/>
            <Icons/>
        </div>
    </div>
  )
}
