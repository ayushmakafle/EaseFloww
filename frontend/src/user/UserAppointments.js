import React from 'react'
import UserMenu from './UserMenu'
import MainNavbar from '../components/Navbar'

const Appointments = () => {
  return (
    <>
      <MainNavbar />
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <h2>My Appointments</h2>
            </div>
        </div>
      </div>
    </>
  )
}

export default Appointments
