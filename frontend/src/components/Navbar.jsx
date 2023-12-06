import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import '../styles/MainNavbar.css';
import { useCart } from '../context/cart';
import { Avatar, Badge } from 'antd';
const MainNavbar = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart()
  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: ''
    });
    localStorage.removeItem('auth');
    localStorage.removeItem('cart');

    toast.success('Logout Successful');
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const navbar = document.querySelector(".navbar");

  //     if (window.pageYOffset > 60) {
  //       navbar.classList.add("scrolled");
  //     } else {
  //       navbar.classList.remove("scrolled");
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <header>
      <div className="wrapper">
        <Navbar expand="lg">
          <div className='logo'>
            <Nav.Link href='/'>EASEFLOW</Nav.Link>
            <Navbar.Toggle aria-controls="navbarNav" />
          </div>
          {/* <Navbar.Collapse id="navbarNav"> */}
            <Nav className="ml-auto">
              <ul>
                <li>
                  <Nav.Link href="#"> Appointment</Nav.Link>
                </li>
                <li>
                  <Nav.Link href="#">Queries!</Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/ecommerce">Our Products</Nav.Link>
                </li>
                {!auth.user ? (
                  <li>
                    <Nav.Link as={Link} to="/login" className="active">
                      <i className="fa-solid fa-user"></i> Profile
                    </Nav.Link>
                  </li>
                ) : (
                  <li>
                    <NavDropdown title={<i className="fa-solid fa-user"></i>} id="navbarDropdown">
                      <NavDropdown.Item as={Link} to={`/dashboard/${auth?.user?.role === 1 ? 'admin' :
                        (auth?.user?.role === 2 ? 'doctor' : 'user')
                        }`}>DashBoard
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/logout" onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  </li>
                )}
                <li>
                <LinkContainer to='/cart' className='p-4 m-4'>
              <Badge count={cart?.length} showZero>
                <Nav.Link as={Link} to='/cart'>
                  <i className="fa-solid fa-cart-shopping"></i> </Nav.Link>
              </Badge>
            </LinkContainer>
                 
                </li>
              </ul>
            </Nav>
          {/* </Navbar.Collapse> */}
        </Navbar>
      </div>
    </header>
  );
};

export default MainNavbar;
