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
    
    <div className="hero-section" style={{ background: 'linear-gradient(109.6deg, #ef5e99 11.2%, #f38dbc 100.2%)', color: '#fff', padding: '50px' }}>
      <div className="center">
        <h1 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: "600" ,fontSize:"60px", color:"white" , animation: "fadeIn 1s "}}>Welcome to the doctor portal of EaseFlow</h1>
        <h4 style={{ animation: "fadeIn 1s "}}>You are one of our trusted doctors. Thank you for working with us.</h4>
        <NavLink to="/dashboard/doctor/doctor-profile" className="btn light" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: "45" ,fontSize:"20px", color:"white",backgroundColor:"#e73d90" }}>
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
