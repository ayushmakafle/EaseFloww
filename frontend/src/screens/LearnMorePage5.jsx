// LearnMorePage5.js

import React from 'react';
import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css'; // Use the same CSS file for consistency
import Footer from '../components/footer';

const LearnMorePage5 = () => {
  return (
    <>
      <MainNavbar />
      <div className="page-container">
        <h1 className="page-heading">Connecting with Your Body</h1>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              Connecting with one's body during menstruation is a holistic approach that involves tuning into the body's signals, embracing its natural rhythms, and fostering a positive relationship with oneself. This connection extends beyond physical awareness to encompass emotional and spiritual well-being, creating a harmonious and empowering relationship with the self.
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
              Building awareness of the body's signals throughout the menstrual cycle involves menstrual tracking. Observing changes in mood, energy levels, and physical sensations provides valuable insights into the cyclical nature of menstruation. Utilizing tracking methods facilitates a deeper understanding of individual patterns.
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              Engaging in mind-body practices enhances self-awareness and emotional well-being. Practices such as meditation, yoga, or tai chi create opportunities for introspection, grounding, and centering. These practices contribute to a mindful and holistic connection with the body.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/gloomy-caucasian-woman-cares-about-personal-hygiene_176532-7404.jpg?w=1060&t=st=1702376468~exp=1702377068~hmac=bb80de94afc000d4744860b4ec7ef58393504841343414c5c46128cdb1995bd2"
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
              Connecting with the body during menstruation includes actively listening to its needs. This may involve adjusting daily activities, dietary choices, and self-care practices based on the changing requirements of each menstrual phase. Responding with sensitivity fosters a compassionate relationship with oneself.
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              Embracing the unique aspects of femininity associated with the menstrual cycle is a powerful aspect of connecting with the body. Celebrating the strengths, resilience, and intuition that come with being a woman during menstruation contributes to a positive self-image and fosters a sense of empowerment.
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

export default LearnMorePage5;
