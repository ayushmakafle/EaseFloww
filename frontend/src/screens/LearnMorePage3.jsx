// LearnMorePage3.js

import React from 'react';
// import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css'; // Use the same CSS file for consistency
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const LearnMorePage3 = () => {
   const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back
  };
  return (
    <>
      {/* <MainNavbar /> */}
      <div className="page-container">
        <button className="back-button" onClick={goBack}>
          <span role="img" aria-label="Back Arrow" className="pink-arrow">❮❮</span> 
        </button>
        <h1 className="page-heading">Menstruation and Hormonal Changes</h1>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              Menstruation is intricately tied to hormonal changes that occur throughout the menstrual cycle. Understanding the nuances of these hormonal fluctuations is essential for gaining insights into the physiological and emotional shifts that women experience. The menstrual cycle consists of distinct phases, each characterized by unique hormonal patterns that influence various aspects of a woman's health.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/portrait-cheerful-positive-curly-haired-woman-standing-isolated-pink_176532-7432.jpg?w=996&t=st=1702127856~exp=1702128456~hmac=32f89c6f24923eb75dff73f846d465ad3fec80bfba041c796ee77ebc4ab657c8"
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
              Two key hormones, estrogen and progesterone, play pivotal roles in orchestrating the menstrual cycle. Estrogen rises during the follicular phase, promoting the maturation of eggs, while progesterone dominates the luteal phase, preparing the uterus for a potential pregnancy. The delicate dance between these hormones regulates the ebb and flow of the menstrual cycle.
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              Hormonal changes exert a profound influence on mood and energy levels. Women may experience fluctuations in mood, ranging from heightened energy during ovulation to potential mood swings and fatigue premenstrually. Recognizing and acknowledging these variations fosters a greater understanding of the mind-body connection inherent in the menstrual cycle.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/young-brunette-woman-jeans-sweater_273609-41333.jpg?w=996&t=st=1702127737~exp=1702128337~hmac=2af47989e152cab933fe54278471149c5f4738fc7d8cf913b6fb86f124fac459"
            alt="Image 3"
            className="paragraph-image"
          />
        </div>

        <div className="paragraph-container reverse">
          <img
            src="https://img.freepik.com/free-photo/portrait-cute-cheerful-pretty-young-woman-pajamas-with-curly-brunette-hair-having-fun-bed-stretching-hands-with-pink-tinsels-expressinf-happiness_197531-2287.jpg?w=996&t=st=1702127956~exp=1702128556~hmac=6d55e9c97b20adb66a638332e316cad69394bb9f2cd6ffa8941e8b7ef0aa4669"
            alt="Image 4"
            className="paragraph-image"
          />
          <div className="text-box">
            <p className="page-paragraph">
              Imbalances in hormonal levels can contribute to menstrual disorders, such as irregular periods, premenstrual syndrome (PMS), and conditions like polycystic ovary syndrome (PCOS). Addressing hormonal health through lifestyle factors like regular exercise, a balanced diet, and stress management becomes crucial for promoting overall well-being.
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              Maintaining hormonal balance is paramount for reproductive health, fertility, and overall well-being. By adopting a holistic approach to health, women can support their hormonal systems through nourishing foods, regular exercise, and mindfulness practices. The recognition of the intricate interplay between hormones and health underscores the significance of hormonal well-being throughout a woman's life.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/good-looking-feminine-girl-holds-clean-sanitary-napkin_176532-12421.jpg?w=996&t=st=1702127917~exp=1702128517~hmac=26dc44ba573cc8c9910b5735c9176506ba36eba97ee942ab01e55d40e86130b5"
            alt="Image 5"
            className="paragraph-image2"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LearnMorePage3;
