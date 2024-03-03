import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import '../styles/MainNavbar.css';
import { useCart } from '../context/cart';
import { Avatar, Badge } from 'antd';
//import { useChatbot } from '../hooks/useChatbot';
import { useChat } from '../context/chat';

const MainNavbar = () => {
  const { clearChatHistory, setChatVisible } = useChat()
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
    // Clear chat history when logging out
    clearChatHistory();
    setChatVisible(false)
    toast.success('Logout Successful');
    navigate('/login');

  };

  return (
    <header>
      <div className="wrapper">
        <Navbar expand="lg">
          <ul className='logo'>
            <LinkContainer to="/">
              <Navbar.Brand className="pb-1 text-white mt-3">EASEFLOW</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbarNav" />
          </ul>
          <Navbar.Collapse id="navbarNav">
            <Nav className="mx-3">
              <ul className="navbar-nav">
                <li className="nav-item mt-0">
                  <LinkContainer to="/appointment-homepage">
                    <Nav.Link className="pb-3 text-white">Appointment</Nav.Link>
                  </LinkContainer>
                </li>

                <li className="nav-item mt-0">
                  <LinkContainer to="/ecommerce">
                    <Nav.Link className="pb-3 text-white"> Products</Nav.Link>
                  </LinkContainer>
                </li>
                {/* {auth.user && (
                  <li className="nav-item mt-0">
                    <LinkContainer to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : auth?.user?.role === 2 ? 'doctor' : 'user'
                      }`}>
                      <Nav.Link className="pb-3 text-white">Dashboard</Nav.Link>
                    </LinkContainer>
                  </li>
                )} */}
              </ul>
            </Nav>
          </Navbar.Collapse>
          <Nav className="ml-auto">
            <ul className="navbar-nav">
              {!auth.user ? (
                <Nav className="ml-auto">
                  <ul className="navbar-nav">
                    <li className="nav-item mt-0">
                      <LinkContainer to="/login" className="active">
                        <Nav.Link className="pb-3 text-white">
                          <i className="fa-solid fa-user"></i>
                        </Nav.Link>
                      </LinkContainer>
                    </li>
                  </ul>
                </Nav>
              ) : (
                <>
                  <NavDropdown
                    title={<span style={{ color: 'white' }}>Hello, {auth.user.username}</span>}
                    id="navbarDropdown"
                  >
                    {auth.user && (
                      <button className="btn btn-transparent">
                        <LinkContainer to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : auth?.user?.role === 2 ? 'doctor' : 'user'
                          }`}>
                          <Nav.Link>Dashboard</Nav.Link>
                        </LinkContainer>
                      </button>
                    )}

                    <button className='btn btn-transparent' onClick={handleLogout}>
                      Logout
                    </button>
                  </NavDropdown>
                </>
              )}
              <li className="nav-item mt-0">
                <LinkContainer to="/cart" className="p-4 m-4">
                  <Badge count={cart?.length} showZero>
                    <Nav.Link as={Link} to="/cart" className="pb-3 text-white">
                      <i className="fa-solid fa-cart-shopping"></i>
                    </Nav.Link>
                  </Badge>
                </LinkContainer>
              </li>
            </ul>
          </Nav>
        </Navbar>
      </div>
    </header>
  );
};

export default MainNavbar;
