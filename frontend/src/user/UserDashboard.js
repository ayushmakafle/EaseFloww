import React from 'react'
import { useNavigate } from "react-router-dom";
// import MainNavbar from '../components/Navbar'
import UserMenu from './UserMenu'
import {useAuth} from '../context/auth'

const UserDashboard = () => {
  const navigate = useNavigate()
  const [auth] = useAuth()
  const goBack = () => {
    navigate(-1); // Navigate back
  };
  return (
<>
  {/* <MainNavbar /> */}
  <button className="back-button" onClick={goBack}>
          <span role="img" aria-label="Back Arrow" className="pink-arrow" style={{ color: '#f38dbc' }}>❮❮</span>
        </button>
  <div className='container-fluid mt-3 mb-3'>
    <div className='row'>
      <div className='col-md-3'>
        <UserMenu />
      </div>
      
      <div className='col-md-9'>
        <div className='card p-3 d-flex align-items-center m-5'>
          <div>
            <h1 className='mb-3' style={{ color: '#ef5e99', fontWeight: 'normal', fontFamily: 'sans-serif', textAlign: 'center' }}>
              Hello {auth?.user?.username}!
            </h1>
            <h5 style={{ color: '#c01c5c', fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>
              We're glad to have you here at EaseFlow. <br />Explore the features and make the most of your dashboard experience.
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</>



  )
}

export default UserDashboard
