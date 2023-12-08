import React from 'react';
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
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    localStorage.removeItem('cart');
    toast.success('Logout Successful');
  };

  return (
    <header>
      <div className="wrapper">
        <Navbar expand="lg">
          <div className='logo'>
            <LinkContainer to="/">
              <Navbar.Brand><Nav.Link as={Link} to='/'>EASEFLOW</Nav.Link></Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbarNav" />
          </div>
          <Navbar.Collapse id="navbarNav">
            <Nav className="ml-auto">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <LinkContainer to="/appointment">
                    <Nav.Link>Appointment</Nav.Link>
                  </LinkContainer>
                </li>
                <li className="nav-item">
                  <LinkContainer to="/queries">
                    <Nav.Link>Queries!</Nav.Link>
                  </LinkContainer>
                </li>
                <li className="nav-item">
                  <LinkContainer to="/ecommerce" >
                    <Nav.Link>Our Products</Nav.Link>
                  </LinkContainer>
                </li>
                {!auth.user ? (
                  <li className="nav-item">
                    <LinkContainer to="/login" className="active">
                      <Nav.Link>
                        <i className="fa-solid fa-user"></i> Profile
                      </Nav.Link>
                    </LinkContainer>
                  </li>
                ) : (
                  <NavDropdown
                    title={<i className="fa-solid fa-user"></i>}
                    id="navbarDropdown"
                  >
                    <LinkContainer
                      to={`/dashboard/${auth?.user?.role === 1
                          ? 'admin'
                          : auth?.user?.role === 2
                            ? 'doctor'
                            : 'user'
                        }`}
                    >
                      <NavDropdown.Item>DashBoard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/logout" onClick={handleLogout}>
                      <NavDropdown.Item>Logout</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                <li className="nav-item">
                  <LinkContainer to='/cart' className='p-4 m-4'>
                    <Badge count={cart?.length} showZero>
                      <Nav.Link as={Link} to='/cart'>
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
