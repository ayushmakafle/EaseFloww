import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MainNavbar from './../components/Navbar';
import Footer from '../components/footer';
import '../styles/MainNavbar.css';

const LandingPage = () => {
  return (
    <>
    <MainNavbar />
      <div>
        <div className="hero-section">
          <div className="left">
            <h1>Track, <br /> Learn, <br />Flourish</h1>
            <p>
              Learn more about your cycle with us.
            </p>
            <Nav.Link as={Link} to="/homepage" className="btn light">Learn More about Us</Nav.Link>
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
              <h1>Lets go touring menstruation</h1>
              <div className="features">
                <p> "Welcome to our space where we openly discuss the beauty and significance of menstruation, a natural and essential aspect of women's health."
                </p>
              </div>
            </div>
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
