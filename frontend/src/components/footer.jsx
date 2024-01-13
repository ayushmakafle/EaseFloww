import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/MainNavbar.css';
const MainFooter = () => {
    return (
        <>
    <footer>
        <div class="wrapper">
            <div class="links-container">
                <div class="links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>
                            <a href="#">About us</a>
                        </li>
                        <li>
                            <a href="#">Contact us</a>
                        </li>
                        <li>
                            <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#">Terms and Conditions</a>
                        </li>
                    </ul>
                </div>
                <div class="links">
                    <h3>Encyclopedia</h3>
                    <ul>
                        <li>
                            <a href="/Login">Login</a>
                        </li>
                        <li>
                            <a href="/queries">Chatbot</a>
                        </li>
                        <li>
                            <a href="/appointment-homepage">Gynecologist appointment</a>
                        </li>
                        <li>
                            <a href="/ecommerce">Our Products</a>
                        </li>
                    </ul>
                </div>
                <div class="links">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>easeflow@gmail.com</li>
                    </ul>
                    <form action="#">
                        <input type="text" placeholder="Email Address"/>
                        <button class="submit-btn">Subscribe</button>
                    </form>
                </div>
            </div>
            <p class="copyright">© 2023 EaseFlow</p>
        </div>
    </footer>
        </>
    );
};

export default MainFooter;
