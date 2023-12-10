import React from 'react';
import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css';
import Footer from '../components/footer';
const LearnMorePage1 = () => {
  return (
    <>
    <MainNavbar />
    <div className="page-container">
      <h1 className="page-heading">Embracing Your Menstrual Cycle</h1>
      <p className="page-paragraph">
        Discovering the beauty of your menstrual cycle is an empowering journey that allows women
        to connect with their bodies on a profound level. Embracing the different phases of the
        menstrual cycle involves understanding the natural ebb and flow of hormonal changes
        throughout the month.
      </p>
      <p className="page-paragraph">
        Each phase of the menstrual cycle brings unique qualities and opportunities for self-care.
        From the menstrual phase to ovulation and beyond, women can tailor their routines to
        align with the changing needs of their bodies, fostering a sense of harmony and well-being.
      </p>
      <p className="page-paragraph">
        Embracing your menstrual cycle is not just about acceptance; it's about celebrating the
        innate wisdom of the female body. By recognizing the cyclical nature of menstruation,
        women can navigate life with a deeper understanding of themselves and their inherent strength.
      </p>
    </div>
    <Footer />
    </>
  );
};

export default LearnMorePage1;
