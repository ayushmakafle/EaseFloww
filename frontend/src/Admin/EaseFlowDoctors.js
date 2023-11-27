import React from 'react'
import AdminMenu from './AdminMenu'
import MainNavbar from '../Navbar'

const EaseFlowDoctors = () => {
  return (
     <>
    <MainNavbar />
    
         <div className='container-fluid m-3 p-3'>

    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu />
        </div>
        <div className='col-md-9'>
            <h1>All EaseFlow Doctors</h1>
        </div>
    </div>
    </div>
    </>
  )
}

export default EaseFlowDoctors
