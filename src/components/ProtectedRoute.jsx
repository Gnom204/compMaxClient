import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { checkToken } from '../utils/api/authApi'

export const ProtectedRoute = ({ children }) => {
  useEffect(() => {
    checkToken(localStorage.getItem('token')).then((res) => {
      if (!res) {
        localStorage.removeItem('token');
      }
      else {
        console.log(res);
        console.log('token is valid');
      }
    })
  },[])
  if(!localStorage.getItem('token')) {
  {console.log('no token');}
    return <Navigate to="/" />
  } else{
    {console.log('token');}
      return children;
  }
}
export default ProtectedRoute

