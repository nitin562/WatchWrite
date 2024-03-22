import React, { useState } from 'react'

export default function HoverToogle({displayComponent,innerComponent,height,left}) {
    const [toogle, settoogle] = useState(false)
  return (
    <div className={`h-1/2 transition duration-200`} onClick={()=>settoogle(prev=>!prev)}>
        {displayComponent}
        <div className='transition duration-500 overflow-hidden h-0  absolute mt-[0.5rem] bg-slate-800/40 backdrop-blur-lg '  style={{marginLeft:left,height:toogle?height:0}} >
            {innerComponent}
        </div>
    </div>
  )
}
