import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
export default function Home() {
  return (
    <>
        <Routes>
            <Route exact path="/" element={<Login/>}/>
        </Routes>
    </>
  )
}
