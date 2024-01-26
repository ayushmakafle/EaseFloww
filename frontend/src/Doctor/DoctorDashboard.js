import React from 'react';
import { NavLink } from 'react-router-dom';
import DoctorNavbar from './DoctorNavbar';
import '../styles/MainNavbar.css';
import Lottie from 'lottie-react';
import animation from './doctordash.json';

const DoctorDashboard = () => {
  return (
    <>
    <DoctorNavbar />
    
    <div className="hero-section" style={{ background: '#ff69b4', color: '#fff', padding: '50px' }}>
      <div className="center">
        <h1>Welcome to the doctor portal of EaseFlow</h1>
        <h4>You are one of our trusted doctors. Thank you for working with us.</h4>
        <NavLink to="/dashboard/doctor/doctor-profile" className="btn light">
          View your profile
        </NavLink>
      </div>
       <Lottie
              animationData={animation}
              className="lottie-animation-home cursor-pointer m-4"
              style={{ width: '500px', height: '500px' }} 
      />
    </div>
    </>
  );
};

export default DoctorDashboard;
