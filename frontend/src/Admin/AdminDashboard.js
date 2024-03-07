import React from 'react'
//import MainNavbar from '../components/Navbar'
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth'

const AdminDashboard = () => {
  const[auth] = useAuth()
  console.log(auth);
  return (
    <>
     {/* <MainNavbar />  */}
     <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <div className='card w-75 p-3 m-5'>
            <h1 style={{color:'#ef5e99',fontWeight: 'bold', textShadow: '1px 1px 1px #f38dbc'}}>Welcome {auth?.user?.username}!</h1>
            <h4 style={{color:'#ef5e99'}}>You've arrived at the heart of Easeflow's admin panel. </h4>
          </div>
        </div>

      </div>
     </div>
    </>
  )
}

export default AdminDashboard
