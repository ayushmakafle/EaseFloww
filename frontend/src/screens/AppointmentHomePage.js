import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

//import MainNavbar from '../components/Navbar'
import '../styles/MainNavbar.css';


const AppointmentHomePage = () => {
  return (
    <>
    {/* <MainNavbar /> */}
    <div className="hero-section" style={{ overflowY: 'hidden' }}>
          <div className="left">
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: "600" ,fontSize:"60px", color:"white" , animation: "fadeIn 1s "}}>Hassle free appointments <br /> Just book online</h2>
            <Nav.Link as={Link} to="/all-doctors" className="btn light"style={{ fontFamily: 'Raleway, sans-serif', fontWeight: "45" ,fontSize:"20px", color:"white",backgroundColor:"#e73d90" }}>View EaseFlow Doctors</Nav.Link>
          </div>
          <div className="right">
            <img src="images/calenderbg.jpg" alt="" />
          </div>
        </div>

    </>
  )
}

export default AppointmentHomePage