import React, { useMemo } from "react";
import errorImg from "../../../public/error.png";
export default function ErrorPop({ popArr }) {
  return (
    <div className="w-screen md:w-[40vw] absolute bottom-4 right-0 flex flex-col gap-y-8 items-center overflow-hidden">
      {popArr.map((data) => {
        return (
          <div
            key={data.id}
            className="z-10 w-[90%] break-words text-wrap font-Philosopher text-red-400 backdrop-blur-lg border-2 shadow-sm shadow-black text-2xl py-2 rounded-lg translate-x-[120%] animate-GoLeft flex flex-col gap-x-4 items-center"
          >
            <div className="flex w-full h-[90%]  items-center gap-x-4">
              <img className="aspect-square w-10 mx-2" src={errorImg} alt="error" />
              <p>{data.message}</p>
            </div>
            <div className="w-full rounded-lg h-2 bg-red-500/80 relative top-2 animate-ReduceTime origin-left"></div>
          </div>
        );
      })}
    </div>
  );
}
