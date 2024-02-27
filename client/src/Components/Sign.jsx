import React, { useState } from "react";

import SignInPartOne from "./UtilComp/SignInPartOne";


export default function Sign() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleVisiblity=()=>{
    setPasswordVisible(prev=>!prev)
  }

  return (
    <div className='w-screen h-screen bg-slate-800/90 bg-center bg-cover flex justify-center items-center before:bg-LoginBG before:bg-center before:bg-cover before:absolute before:content-[""] before:w-screen before:h-screen before:inset-0 before:-z-10'>
      <div className="w-[90%] h-[38rem] p-1 md:w-[40%]  flex flex-col ">
        
        <SignInPartOne passwordVisible={passwordVisible} setPasswordVisible={setPasswordVisible} toggleVisiblity={toggleVisiblity} />
        
      </div>
    </div>
  );
}
