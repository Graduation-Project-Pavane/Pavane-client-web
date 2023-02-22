import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import CustomerLayout from '../../layouts/CustomerLayout/CustomerLayout'
import SignUp from '../../pages/SignUp/SignUp'
import './ProtectedRoute.scss'

export default function ProtectedRoute() {

  const auth = useSelector((state) => state.auth)

  if (auth.customerToken) {
    return <CustomerLayout />
  } else if (window.location.pathname === '/sign-up') {
    return <SignUp />
  } else {
    return <Navigate to="/loginCustomer" />;
  }
}
