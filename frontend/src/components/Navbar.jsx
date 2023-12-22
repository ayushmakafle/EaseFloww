import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import '../styles/MainNavbar.css';
import { useCart } from '../context/cart';
import { Avatar, Badge } from 'antd';

const MainNavbar = ({ clearChatHistory }) => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate()
  const handleLogout = (e) => {
    e.preventDefault();

    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    localStorage.removeItem('cart');
    toast.success('Logout Successful');
    navigate('/login');
    // Clear chat history when logging out
    clearChatHistory();
  };

  return (
    <header>
      <div className="wrapper">
        <Navbar expand="lg">
          <ul className='logo'>
            <LinkContainer to="/">
              <Navbar.Brand className="pb-3 text-white mt-3">EASEFLOW</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbarNav" />
          </ul>
          <Navbar.Collapse id="navbarNav">
            <Nav className="ml-auto">
              <ul className="navbar-nav">
                <li className="nav-item mt-0">
                  <LinkContainer to="/appointment-homepage">
                    <Nav.Link className="pb-3 text-white">Appointment</Nav.Link>
                  </LinkContainer>
                </li>

                {/*  <li className="nav-item mt-0">
                  <LinkContainer to="/queries">
                    <Nav.Link className="pb-3 text-white">Queries!</Nav.Link>
                  </LinkContainer>
                </li> */}
                <li className="nav-item mt-0">
                  <LinkContainer to="/ecommerce">
                    <Nav.Link className="pb-3 text-white"> Products</Nav.Link>
                  </LinkContainer>
                </li>
                <li className="nav-item mt-0">
                  <LinkContainer to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : auth?.user?.role === 2 ? 'doctor' : 'user'
                    }`}>
                    <Nav.Link className="pb-3 text-white">Dashboard</Nav.Link>
                  </LinkContainer>
                </li>
                {!auth.user ? (
                  <li className="nav-item mt-0">
                    <LinkContainer to="/login" className="active">
                      <Nav.Link className="pb-3 text-white">
                        <i className="fa-solid fa-user"></i> Profile
                      </Nav.Link>
                    </LinkContainer>
                  </li>
                ) : (

                  <NavDropdown title={<i className="fa-solid fa-user"></i>} id="navbarDropdown">
                    <button className='btn btn-transparent' onClick={handleLogout}>
                      <NavDropdown.Item className="pb-3">Logout</NavDropdown.Item>
                    </button>

                  </NavDropdown>
                )}
                <li className="nav-item mt-0">
                  <LinkContainer to="/cart" className="p-4 m-4">
                    <Badge count={cart?.length} showZero>
                      <Nav.Link as={Link} to="/cart" className="pb-3">
                        <i className="fa-solid fa-cart-shopping"></i>
                      </Nav.Link>
                    </Badge>
                  </LinkContainer>
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default MainNavbar;
