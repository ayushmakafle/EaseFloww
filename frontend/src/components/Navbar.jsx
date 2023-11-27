import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './MainNavbar.css';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';

const MainNavbar = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        });
        localStorage.removeItem('auth');
        toast.success('Logout Successful');
        navigate('/login');
    };

    return (
        <Navbar expand="lg" variant="dark" className="custom-navbar">
            <Navbar.Brand as={Link} to="/">Ease Flow</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#appointment">Gynecologist Appointment</Nav.Link>
                    <Nav.Link href="#chatbot">Chatbot Assistance</Nav.Link>
                    <Nav.Link href="/ecommerce">Menstrual Health Products</Nav.Link>

                    {!auth.user ? (
                        <Nav.Link as={Link} to="/login" className="active">
                            <i className="fa-solid fa-user"></i> Profile
                        </Nav.Link>
                    ) : (
                        <>
                            <NavDropdown title={<i className="fa-solid fa-user"></i>} id="navbarDropdown">
                                <NavDropdown.Item as={Link}
                                    to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>
                                    Dashboard</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout} as={Link} to="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>

                        </>
                    )}

                    <Nav.Link href="#" style={{ marginLeft: '375px' }}>
                        <i className="fa-solid fa-cart-shopping"></i> Cart
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNavbar;
