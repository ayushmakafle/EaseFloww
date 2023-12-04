import React from 'react';
import { NavLink } from 'react-router-dom';
import DoctorNavbar from './DoctorNavbar';

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
    </div>
    </>
  );
};

export default DoctorDashboard;
