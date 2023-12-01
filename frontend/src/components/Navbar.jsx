import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';

const MainNavbar = () => {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        });
        localStorage.removeItem('auth');
        localStorage.removeItem('cart');

        toast.success('Logout Successful');
    };

    return (
        <header>
            <div className="wrapper">
                <Navbar expand="lg">
                    <div className="logo">
                        <Nav.Link href='/'>EASEFLOW</Nav.Link>
                    </div>
                    <ul>
                        <li>
                            <Nav.Link href="#">Gynecologist Appointment</Nav.Link>
                        </li>
                        <li>
                            <Nav.Link href="#">Queries!</Nav.Link>
                        </li>
                        <li>
                            <Nav.Link as={Link} to="/ecommerce">Our Products</Nav.Link>
                        </li>
                        {!auth.user ? (
                            <Nav.Link as={Link} to="/login" className="active">
                                <i className="fa-solid fa-user"></i> Profile
                            </Nav.Link>
                        ) : (
                            <NavDropdown title={<i className="fa-solid fa-user"></i>} id="navbarDropdown">
                                <LinkContainer to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>
                                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/logout">
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                        <li>
                            <Nav.Link as={Link} to='/cart' style={{ marginLeft: '7px' }}>
                                <i className="fa-solid fa-cart-shopping"></i> Cart
                            </Nav.Link>
                        </li>
                    </ul>
                </Navbar>

                {/* <!-- end of desktop navigation menu --> */}
                <nav className="mobile-nav">
                    <div className="logo">EASEFLOW</div>
                    <div className="menu-icon">
                        <img src="images/icons8-menu-bar-64.png" alt="" />
                    </div>
                </nav>
            </div>
        </header>
    );
};
export default MainNavbar;