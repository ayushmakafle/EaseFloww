// LearnMorePage2.js

import React from 'react';
// import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css'; // Use the same CSS file for consistency
import Footer from '../components/footer';

const LearnMorePage2 = () => {
  return (
    <>
      {/* <MainNavbar /> */}
      <div className="page-container">
        <h1 className="page-heading">Self-Care During Menstruation</h1>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              A fundamental aspect of self-care during menstruation is prioritizing rest and relaxation. Menstrual cycles can bring about fatigue and discomfort, making it crucial to allow oneself sufficient time for restful sleep and moments of relaxation. Creating a serene environment and acknowledging the need for downtime contributes significantly to overall well-being.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/portrait-cheerful-attractive-young-lady-holding-tampon-sanitary-napkin_176532-7402.jpg?w=1060&t=st=1702377083~exp=1702377683~hmac=c764da42c1ad94a8c4139693adf5a07036526c2a3c581561141461e3346c5e7d"
            alt="Image 1"
            className="paragraph-image2"
          />
        </div>

        <div className="paragraph-container reverse">
          <img
            src="https://img.freepik.com/free-photo/portrait-cute-cheerful-pretty-young-woman-pajamas-with-curly-brunette-hair-having-fun-bed-stretching-hands-with-pink-tinsels-expressinf-happiness_197531-2287.jpg?w=996&t=st=1702127956~exp=1702128556~hmac=6d55e9c97b20adb66a638332e316cad69394bb9f2cd6ffa8941e8b7ef0aa4669"
            alt="Image 2"
            className="paragraph-image"
          />
          <div className="text-box">
            <p className="page-paragraph">
              Maintaining optimal hydration levels and focusing on nutritious foods are key components of self-care during menstruation. Drinking plenty of water helps manage bloating and supports the body in eliminating waste. A balanced diet with a focus on iron-rich foods is essential to replenish nutrients lost during menstruation, contributing to sustained energy levels.
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              Choosing comfortable clothing and utilizing menstrual products that align with personal preferences contribute to a sense of comfort and well-being. Furthermore, incorporating small indulgences, such as warm baths, herbal teas, or enjoying a favorite book or movie, can provide moments of pampering and self-nurturing during the menstrual cycle.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/young-brunette-woman-jeans-sweater_273609-41333.jpg?w=996&t=st=1702127737~exp=1702128337~hmac=2af47989e152cab933fe54278471149c5f4738fc7d8cf913b6fb86f124fac459"
            alt="Image 3"
            className="paragraph-image"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LearnMorePage2;
