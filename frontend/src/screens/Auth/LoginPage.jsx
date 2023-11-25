import React from 'react'
import Login from '../../components/Login.jsx';
import Navbarr from '../../components/Navbar.jsx';

const LoginPage = () => {
  return (
    <>
      <Navbarr />
      <div className='w-full h-screen bg-gray-50'>
        <Login />
      </div>
    </>
  )
}

export default LoginPage;