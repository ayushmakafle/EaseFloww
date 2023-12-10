import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import MainNavbar from '../components/Navbar'
import '../styles/MainNavbar.css';


const AppointmentHomePage = () => {
  return (
    <>
    <MainNavbar />
    <div className="hero-section" style={{ overflowY: 'hidden' }}>
          <div className="left">
            <h2 style={{color:"white"}}>Hassle free appointments <br /> Just book online</h2>
            <p>
               Time saving, stress reducing
            </p>
            <Nav.Link as={Link} to="/all-doctors" className="btn light">View EaseFlow Doctors</Nav.Link>
          </div>
          <div className="right">
            <img src="images/calenderbg.jpg" alt="" />
          </div>
        </div>

    </>
  )
}

export default AppointmentHomePage
