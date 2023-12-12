import React, { useEffect } from 'react';
import { Navbar, Nav} from 'react-bootstrap';

import { Link} from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import '../styles/MainNavbar.css';

const DoctorNavbar = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: ''
    });
    localStorage.removeItem('auth');
    localStorage.removeItem('cart');

    toast.success('Logout Successful');
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");

      if (window.pageYOffset > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <div className="wrapper">
        <Navbar expand="lg">
          <div className='logo'>
            <Nav.Link href='/dashboard/doctor'>EASEFLOW</Nav.Link>
            <Navbar.Toggle aria-controls="navbarNav" />
          </div>
          <Navbar.Collapse id="navbarNav">
            <Nav className="ml-auto">
              <ul>
                <li>
                  <Nav.Link href="/dashboard/doctor/doctor-profile"> Your Profile</Nav.Link>
                </li>
                <li>
                  <Nav.Link href="/dashboard/doctor/doctor-appointments"> Your Appointments</Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/dashboard/doctor/doctor-rate-products">Rate Products</Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/login" onClick={handleLogout}>Logout</Nav.Link>
                </li>

              </ul>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default DoctorNavbar;
