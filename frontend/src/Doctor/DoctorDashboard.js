import React from 'react'
import MainNavbar from '../components/Navbar'
import {useAuth} from '../context/auth'
import DoctorMenu from './DoctorMenu'

const DoctorDashboard = () => {
  const [auth] = useAuth()
  return (
    <>
    <MainNavbar />
    <div className='container-fluid mt-3 mb-3'>
  <div className='row'>
    <div className='col-md-3'>
      <DoctorMenu />
    </div>
    <div className='col-md-9'>
      <div className='card p-3'>
        <h3 className='mb-3'>Doctor Information</h3>
        <div className='mb-3'>
          <strong>Username:</strong> {auth?.user?.username}
        </div>
        <div className='mb-3'>
          <strong>Email:</strong> {auth?.user?.email}
        </div>
        <div>
          <strong>Address:</strong> {auth?.user?.address}
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default DoctorDashboard
