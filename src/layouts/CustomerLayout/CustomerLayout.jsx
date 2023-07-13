import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import Navbar from '../../components/Navbar/Navbar'
import './CustomerLayout.scss'

export default function CustomerLayout() {
  return <>

    <Navbar />

    <Routes>
      <Route path='/' element={<Navigate replace to='/home' />} />
      <Route path='/home' element={<Home />} />

      <Route path='/*' element={<Navigate replace to='/home' />} />
    </Routes>
  </>
}
