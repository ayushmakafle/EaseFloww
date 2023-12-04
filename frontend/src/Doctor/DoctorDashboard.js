import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import MainNavbar from '../components/Navbar';

const DoctorDashboard = () => {
  return (
    <>
    <MainNavbar />
    
    <div className="hero-section" style={{ background: '#ff69b4', color: '#fff', padding: '50px' }}>
      <div className="left">
        <h2>Welcome to the doctor portal of EaseFlow</h2>
        <p>You are one of our trusted doctors. Thank you for working with us.</p>
        <Nav.Link as={Link} to="/doctor-dashboard" className="btn light">
          Update your profile and 
        </Nav.Link>
      </div>
      <div className="right">
        <img src="../../public/images/calenderbg.jpg" alt="" style={{ width: '100%' }} />
      </div>
    </div>
    </>
  );
};

export default DoctorDashboard;
