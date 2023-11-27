import React from 'react'
import MainNavbar from '../components/Navbar'
import AdminMenu from './AdminMenu'

const CreateProduct = () => {
  return (
     <>
    <MainNavbar />
     <div className='container-fluid m-3 p-3'>

    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu />
        </div>
        <div className='col-md-9'>
            <h1>Create Products</h1>
        </div>
    </div>
    </div>
    </>
  )
}

export default CreateProduct
