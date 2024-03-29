import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// import MainNavbar from './../components/Navbar';
import Footer from '../components/footer';
import '../styles/MainNavbar.css';
// import Lottie from 'lottie-react';
// import animationData from '../components/audio.json';

const LandingPage = () => {
  return (
    <>
      {/* <MainNavbar /> */}
      <div>
        <div className="hero-section">
          <div className="left">
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: "600" ,fontSize:"60px", color:"white" , animation: "fadeIn 1s "}}>Embrace <br /> Learn and Flourish</h2>
            <Nav.Link as={Link} to="/homepage" className="btn light"style={{ fontFamily: 'Raleway, sans-serif', fontWeight: "45" ,fontSize:"20px", color:"white",backgroundColor:"#e73d90" }}>Learn more about your cycle</Nav.Link>
          </div>
          <div className="right">
            <img src="images/calenderbg.jpg" alt="" />
          </div>
        </div>
<section className="courses-section">
  <div className="wrapper">
    <div className="course-cards">
      <div className="course-card">
        <img src="images/female-reproductive-system-concept/gradient-menopause-infographic/6984044.jpg" alt="" />
      </div>
      <div className="course-card">
        <p>Click on our chatbot for common menstruation health problems.</p>
      </div>
    </div>
  </div>
</section>

        <div >
          <section className="app-section">
            <h2>CHERISH YOUR CYCLE</h2>
            <p>"Embark on a transformative journey with our app as your steadfast companion throughout your menstrual cycle. Cherish Your Cycle with EaseFlow, where you can seamlessly book personalized appointments with experienced gynecologists, gaining expert insights into women's health and receiving tailored menstrual care advice. Explore our curated ecommerce platform offering high-quality menstrual products, from eco-friendly pads to organic tampons, all designed to prioritize your well-being. Engage in real-time conversations with our interactive chatbot, available 24/7 to provide instant answers to your menstrual health queries, ensuring you have continuous access to valuable information, support, and gentle reminders."</p>
          </section>
        </div>
      </div>
      {/* <Lottie
            animationData={animationData}
            className="lottie-animation-home cursor-pointer"
/> */}
      <Footer />
    </>
  );
}

export default LandingPage;
