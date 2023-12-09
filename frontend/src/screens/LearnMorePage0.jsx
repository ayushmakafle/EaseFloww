import React from 'react';
import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css';
import Footer from '../components/footer';

const LearnMorePage0 = () => {
  return (
    <>
      <MainNavbar />
      <div className="page-container">
        <div className="paragraph-container">
          <h1 className="page-heading">Understanding Menstruation Pain</h1>
          <p className="page-paragraph">
            Menstruation, often referred to as a woman's "period," is a natural physiological process
            that most women experience on a monthly basis. It is a crucial aspect of the female
            reproductive system, involving the shedding of the uterine lining in the absence of
            pregnancy.
          </p>
          <img src="https://img.freepik.com/free-photo/young-brunette-woman-jeans-sweater_273609-41333.jpg?w=996&t=st=1702127737~exp=1702128337~hmac=2af47989e152cab933fe54278471149c5f4738fc7d8cf913b6fb86f124fac459" alt="Image 1" className="paragraph-image" />
        </div>

        <div className="paragraph-container">
          <p className="page-paragraph">
            Alongside menstruation, many women also experience menstrual pain, also known as
            dysmenorrhea. This pain can range from mild discomfort to severe cramps and is often
            accompanied by various symptoms such as bloating, fatigue, and mood swings.
          </p>
          <img src="https://img.freepik.com/free-photo/portrait-cheerful-positive-curly-haired-woman-standing-isolated-pink_176532-7432.jpg?w=996&t=st=1702127856~exp=1702128456~hmac=32f89c6f24923eb75dff73f846d465ad3fec80bfba041c796ee77ebc4ab657c8" alt="Image 2" className="paragraph-image2" />
        </div>

        <div className="paragraph-container">
          <p className="page-paragraph">
            Menstrual pain is a unique and personal experience, and its intensity varies among women.
            Some may barely notice it, while others may find it challenging to engage in daily activities.
            It's essential to recognize that menstruation and its associated discomfort are normal
            physiological processes that women navigate throughout their lives.
          </p>
          <img src="https://img.freepik.com/free-photo/portrait-cute-cheerful-pretty-young-woman-pajamas-with-curly-brunette-hair-having-fun-bed-stretching-hands-with-pink-tinsels-expressinf-happiness_197531-2287.jpg?w=996&t=st=1702127956~exp=1702128556~hmac=6d55e9c97b20adb66a638332e316cad69394bb9f2cd6ffa8941e8b7ef0aa4669" alt="Image 3" className="paragraph-image" />
        </div>

        <div className="paragraph-container">
          <p className="page-paragraph">
            Understanding menstruation and its pain is crucial for promoting empathy and support
            for women. By acknowledging the naturalness of this process, we can foster a more
            compassionate and informed perspective on women's health.
          </p>
          <img src="https://img.freepik.com/free-photo/good-looking-feminine-girl-holds-clean-sanitary-napkin_176532-12421.jpg?w=996&t=st=1702127917~exp=1702128517~hmac=26dc44ba573cc8c9910b5735c9176506ba36eba97ee942ab01e55d40e86130b5" alt="Image 4" className="paragraph-image2" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LearnMorePage0;
