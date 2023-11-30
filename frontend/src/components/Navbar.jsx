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
        localStorage.removeItem('cart');

        toast.success('Logout Successful');
        navigate('/login');
    };

    return (
        // <Navbar expand="lg" variant="dark" className="custom-navbar">
        //     <Navbar.Brand as={Link} to="/">Ease Flow</Navbar.Brand>
        //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //     <Navbar.Collapse id="basic-navbar-nav">
        //         <Nav className="ml-auto">
        //             <Nav.Link href="#appointment">Gynecologist Appointment</Nav.Link>
        //             <Nav.Link href="#chatbot">Chatbot Assistance</Nav.Link>
        //             <Nav.Link href="/ecommerce">Menstrual Health Products</Nav.Link>
        <header>
        <div class="wrapper">
            <nav>
                <div class="logo">
                    EASEFLOW
                </div>
                <ul>
                    <li>
                        <a href="#">Gynecologist Appointment</a>
                    </li>
                    <li>
                        <a href="#">Queries!</a>
                    </li>
                    <li>
                        <a href="/ecommerce">Our Products</a>
                    </li>
                    <li>
                        <a href="/Login" class = "btn dark">Login</a>
                    </li>
                
                           
                {!auth.user ? (
                  <li>
                        <Nav.Link as={Link} to="/login" className="active">
                            <i className="fa-solid fa-user"></i> Profile
                        </Nav.Link>
                        </li>
                
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
<li>
                    <Nav.Link href='/cart' style={{ marginLeft: '375px' }}>
                        <i className="fa-solid fa-cart-shopping"></i> Cart
                    </Nav.Link>
                    </li>
                    </ul>
            </nav>
            
            {/* <!-- end of desktop navigation menu --> */}
            <nav class="mobile-nav">
                <div class="logo">EASEFLOW</div>
                <div class="menu-icon">
                    <img src="images/icons8-menu-bar-64.png" alt />

                </div>
            </nav>
            <div class="hero-section">
                <div class="left">
                    <h1>Track, <br /> Learn, <br />Flourish</h1>

                    <p>
                        something to write on idk anythig bro
                    </p>
                    <a href="/SignUp" class="btn light">Sign Up</a>
                </div>
                <div class="right">
                    <img src="images/calenderbg.jpg" alt />

                </div>
  
            </div>
        </div>
          
              <div class="wrapper">
              <section class="testimonials-section">
                  <div class="left">
                  <div class="testimonial-card">
                      <div class="content">
                      “Leaders bleed, period.”
                      </div>
                      <div class="info">
                          <h4>Silvia Young</h4>
                          <p class="company">Developer,Sony</p>
                      </div>
                  </div>
                  <div class="testimonial-card">
                      <div class="content">
                      “I bleed twelve weeks a year, so I know a thing or two about bloodstains.”
                      </div>
                      <div class="info">
                          <h4>Amanda Lovelace</h4>
                          <p class="company">The Witch Doesn't Burn in this One</p>
                      </div>
                  </div>
                  </div>
                  <div class="right">
                      <h2>Lets go touring menstraution</h2>
                      <div class="features">
                          <p> hvjshfjhsdkfjh dfhkjdshiguvhdfiuvh idfhdfhiuhdfsgfh jfhvidf
                              vdfdfssdf
                          </p>
                          <p> kdgfsjkdgj kvdfjkjf kfgjdfsjgi dfgjodfijgifjdgifjdo</p>
          
                      </div>
                     
                      <a href="#" class="btn light desktop-btn">Go visit</a>
                  </div>
                  <a href="#" class="btn light mobile-btn">Go visit</a>
              </section>       
          </div>
          {/* <!-- end of test section --> */}
          <section class="courses-section">
              <div class="wrapper">
                  <h2 class="light">Our Courses</h2>
                  <div class="course-cards">
                      <div class="course-card">
                          <img src="images/female-reproductive-system-concept/4274784.jpg" alt />

                          <div class="info">
                              <h3>Calender Facilitate</h3>
                              <div class="duration">Moon Time</div>
                          </div>
                      </div>
                      <div class="course-card">
                          <img src="images/female-reproductive-system-concept/gradient-menopause-infographic/6984044.jpg" alt />

                          <div class="info">
                              <h3>Symptoms Measures</h3>
                              <div class="duration">Shark week</div>
                          </div>
                      </div>
      
                  </div>
                  <a href="#" class="btn light">View Calender</a>
              </div>
          </section>
          {/* <!-- end of courses section --> */}
          <div class="wrapper">
              <section class="app-section">
                  <h2>CHERISH YOUR CYCLE</h2>
                  <p>Transform the way you navigate your menstrual journey. Our app is your trusted companion, fluttering alongside you through each cycle, bringing comfort, insights, and gentle reminders.</p>
              </section>
          </div>
          {/* <!-- end of web app visit section --> */}
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
                                  <a href="#">Login</a>
                              </li>
                              <li>
                                  <a href="#">Chatbot</a>
                              </li>
                              <li>
                                  <a href="#">Gynecologist appointment</a>
                              </li>
                              <li>
                                  <a href="#">Our Products</a>
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
          <script src ="main.js"></script>
          </header>
          
    );
};

export default MainNavbar;