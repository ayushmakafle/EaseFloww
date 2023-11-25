// import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './MainNavbar.css';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify'

const MainNavbar = () => {
    const [auth, setAuth] = useAuth()
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth');
        toast.success('Logout Successful')
    }
    return (
        <Navbar expand="lg" variant="dark" className="custom-navbar">
            <Navbar.Brand href="/">Ease Flow</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#appointment">Gynecologist Appointment</Nav.Link>
                    <Nav.Link href="#chatbot">Chatbot Assistance</Nav.Link>
                    <Nav.Link href="/ecommerce">Menstrual Health Products</Nav.Link>
                    {!auth.user ? (
                        <>  <Nav.Link href="/login" className="active" >
                            <i className="fa-solid fa-user"></i> Profile
                        </Nav.Link></>
                    ) : (
                        <>  <Nav.Link
                            onClick={handleLogout} href="/logout" className="active" >
                            <i className="fa-solid fa-user"></i> Logout
                        </Nav.Link></>
                    )

                    }
                </Nav>
                <Nav.Link href="#" style={{ marginLeft: '375px' }}>
                    <i className="fa-solid fa-cart-shopping"></i> Cart
                </Nav.Link>

            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNavbar;
