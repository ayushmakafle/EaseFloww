
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MainNavbar from './../components/Navbar';
import Footer from '../components/Footer';
import '../styles/MainNavbar.css';

const LandingPage = () => {
  return (
    <>
    <MainNavbar />
      <div>
        <div className="hero-section">
          <div className="left">
            <h1>Track, <br /> Learn, <br />Flourish.</h1>
        
            
          </div>
          <div className="right">
            <img src="images/calenderbg.jpg" alt="" />
          </div>
        </div>
        <div className="wrapper">
          <section className="testimonials-section">
            <div className="left">
              <div className="testimonial-card">
                <div className="content">
                  “Leaders bleed, period.”
                </div>
                <div className="info">
                  <h4>Silvia Young</h4>
                  <p className="company">Developer, Sony</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="content">
                  “I bleed twelve weeks a year, so I know a thing or two about bloodstains.”
                </div>
                <div className="info">
                  <h4>Amanda Lovelace</h4>
                  <p className="company">The Witch Doesn't Burn in this One</p>
                </div>
              </div>
            </div>
            <div className="right">
              <h2>Lets go touring menstruation</h2>
              <div className="features">
                <p> hvjshfjhsdkfjh dfhkjdshiguvhdfiuvh idfhdfhiuhdfsgfh jfhvidf
                  vdfdfssdf
                </p>
                <p> kdgfsjkdgj kvdfjkjf kfgjdfsjgi dfgjodfijgifjdgifjdo</p>
              </div>
              <Nav.Link as={Link} to="/homepage" className="btn light desktop-btn">Go visit</Nav.Link>
            </div>
            <Nav.Link as={Link} to="/homepage" className="btn light mobile-btn">Go visit</Nav.Link>
          </section>
        </div>
        <section className="courses-section">
          <div className="wrapper">
            <div className="course-cards">
              <div className="course-card">
                <img src="images/female-reproductive-system-concept/4274784.jpg" alt="" />
                <div className="info">
                  <h3>Calendar Facilitate</h3>
                  <div className="duration">Moon Time</div>
                </div>
              </div>
              <div className="course-card">
                <img src="images/female-reproductive-system-concept/gradient-menopause-infographic/6984044.jpg" alt="" />
                <div className="info">
                  <h3>Symptoms Measures</h3>
                  <div className="duration">Shark week</div>
                </div>
              </div>
            </div>
            <Nav.Link as={Link} to="/homepage" className="btn light">View Calendar</Nav.Link>
          </div>
        </section>
        {/* end of courses section */}
        <div className="wrapper">
          <section className="app-section">
            <h2>CHERISH YOUR CYCLE</h2>
            <p>Transform the way you navigate your menstrual journey. Our app is your trusted companion, fluttering alongside you through each cycle, bringing comfort, insights, and gentle reminders.</p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;