import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './CustomerLayout.scss'
import Home from '../../pages/Home/Home'

export default function CustomerLayout() {
  return <>

    <Routes>
      <Route path='/' element={<Navigate replace to='/home' />} />
      <Route path='/home' element={<Home />} />

      <Route path='/*' element={<Navigate replace to='/home' />} />
    </Routes>
  </>
}
