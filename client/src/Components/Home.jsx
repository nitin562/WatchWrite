import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Sign from './Sign'
export default function Home() {
  return (
    <>
        <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/sign" element={<Sign/>}/>
        </Routes>
    </>
  )
}
