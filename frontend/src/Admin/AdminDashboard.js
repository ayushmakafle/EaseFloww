import React from 'react'
import MainNavbar from '../components/Navbar'
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth'

const AdminDashboard = () => {
  const[auth] = useAuth()
  console.log(auth);
  return (
    <>
    <MainNavbar />
     <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <div className='card w-75 p-3'>
<h1>{auth?.user?.email}</h1>
          </div>
        </div>

      </div>
     </div>
    </>
  )
}

export default AdminDashboard
