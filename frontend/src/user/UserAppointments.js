import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import MainNavbar from '../components/Navbar'
import axios from 'axios'

const Appointments = () => {

  const [appointments,setAppointments] = useState([])

  const getAppointments = async() => {
    try{
      const res = await axios.get('/api/v1/user/user-appointments')
      if(res.data.success){
        setAppointments(res.data.data)
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getAppointments()
  },[])

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
