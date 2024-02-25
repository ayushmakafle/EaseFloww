// LearnMorePage4.js

import React from 'react';
// import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css'; // Use the same CSS file for consistency
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const LearnMorePage4 = () => {
  const navigate=useNavigate();
  const goBack=()=>{
    navigate(-1);
  };
  return (
    <>
      {/* <MainNavbar /> */}
      <div className="page-container">
                <button className="back-button" onClick={goBack}>
<span role="img" aria-label="Back Arrow" className="pink-arrow">❮❮</span> 
        </button>
        <h1 className="page-heading">Nutrition Tips for Menstruating Women</h1>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              Nutrition plays a pivotal role in supporting women's health, particularly during menstruation. A well-balanced diet can address nutritional needs, alleviate symptoms, and contribute to an overall sense of well-being during the menstrual cycle. Tailoring dietary choices to support the body's demands during menstruation is an empowering aspect of women's health.
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
              Menstruation often leads to a loss of iron, making it crucial to include iron-rich foods in the diet. Leafy greens, lean meats, legumes, and fortified cereals are excellent sources of iron. Adequate iron intake helps prevent anemia and supports overall energy levels.
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              Supporting bone health is vital for women, especially during menstruation. Consuming calcium-rich foods, such as dairy products, and ensuring sufficient vitamin D through exposure to sunlight or fortified foods contributes to strong and healthy bones.
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
              Staying well-hydrated is essential for managing bloating and maintaining overall health. Additionally, incorporating foods rich in omega-3 fatty acids, such as fatty fish, flaxseeds, and walnuts, can help reduce inflammation and ease menstrual discomfort.
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              Moderating caffeine and sugar intake is advisable during menstruation. Excessive consumption of these substances can exacerbate symptoms like irritability and cramps. Opting for alternatives and mindful consumption supports better overall health.
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

export default LearnMorePage4;
