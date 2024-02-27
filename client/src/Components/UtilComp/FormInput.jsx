import React from "react";

export default function FormInput({
  type,
  state,
  setstate,
  holder,
  icon,
  func,
  error,
  errState = false,
}) {
  return (
    <div
      className={`w-[90%] border-b-2 flex flex-col h-[2rem]  focus-within:border-emerald-400 group transition duration-500`}
    >
      <div className="w-full h-full flex">
        <img
          src={icon}
          className="transition duration-500 w-[10%] h-auto object-contain invert group-focus-within:invert-0 group-focus-within:bg-emerald-400"
          onClick={func}
        />
        <input
          className=" w-[90%] text-xl font-Dosis caret-emerald-400 text-emerald-200 group-focus-within:text-white outline-none border-0 indent-2 bg-transparent"
          type={type}
          placeholder={holder}
          value={state}
          onChange={(e)=>setstate(e.target.value)}
        />
      </div>
      <p className={`${errState ? "h-8" : "h-0 overflow-hidden"} text-red-400 text-sm font-Abel text-right mt-1`}>{error}</p>
    </div>
  );
}
