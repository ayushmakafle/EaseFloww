
import React from 'react';
// import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css'; // Use the same CSS file for consistency
import Footer from '../components/footer';


const LearnMorePage1 = () => {
  return (
    <>
      {/* <MainNavbar /> */}
      <div className="page-container">
        <h1 className="page-heading">Embracing Your Menstrual Cycle</h1>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              Discovering the beauty of your menstrual cycle is an empowering journey that allows
              women to connect with their bodies on a profound level. Embracing the different phases
              of the menstrual cycle involves understanding the natural ebb and flow of hormonal
              changes throughout the month.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/attractive-caucasian-woman-holding-cotton-tampon-sanitary-napkin_176532-7425.jpg?w=996&t=st=1702912887~exp=1702913487~hmac=14a18acf4998cbd05e6b31a30e1f4bfb5a5991617f91060fe4d55102a19a196a"
            alt="Image 2"
            className="paragraph-image2"
          />
        </div>

        <div className="paragraph-container reverse">
          <img
            src="https://img.freepik.com/free-photo/shopping-concept-confident-happy-asian-woman-holding-credit-card-smiling-satisfied-standing_1258-74980.jpg?w=996&t=st=1702912892~exp=1702913492~hmac=17368f4d6b261dbe4f7f8e57edc4f48dcf5e64d5a3905c11cd3baa30b843ec4c"
            alt="Image 3"
            className="paragraph-image"
          />
          <div className="text-box">
            <p className="page-paragraph">
              Each phase of the menstrual cycle brings unique qualities and opportunities for
              self-care. From the menstrual phase to ovulation and beyond, women can tailor their
              routines to align with the changing needs of their bodies, fostering a sense of harmony
              and well-being.
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              Embracing your menstrual cycle is not just about acceptance; it's about celebrating the
              innate wisdom of the female body. By recognizing the cyclical nature of menstruation,
              women can navigate life with a deeper understanding of themselves and their inherent
              strength.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/smiling-young-girl-model-showing-card-pink-wall_144627-58147.jpg?w=996&t=st=1702912895~exp=1702913495~hmac=4fdadb516b4f5328fd1b090eb72bbb0cd6e83d1270390390c62e531a37370409"
            alt="Image 1"
            className="paragraph-image"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LearnMorePage1;
