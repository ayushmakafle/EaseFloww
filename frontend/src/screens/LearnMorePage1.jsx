import React, { useState } from 'react';
// import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css'; // Use the same CSS file for consistency
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const LearnMorePage1 = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('english'); // default language is English

  const goBack = () => {
    navigate(-1); // Navigate back
  };

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'nepali' : 'english'); // toggle between English and Nepali
  };

  return (
    <>
      {/* <MainNavbar /> */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="back-button" onClick={goBack}>
          <span role="img" aria-label="Back Arrow" className="pink-arrow" style={{ color: '#f38dbc' }}>❮❮</span>
        </button>
        <button className="language-button btn light" onClick={toggleLanguage} style={{ margin: '10px', fontFamily: 'Raleway, sans-serif', fontWeight: '45', fontSize: '20px', color: 'white', backgroundColor: '#e73d90' }}>
          {language === 'english' ? 'नेपालीमा पढ्नुहोस्' : 'Read in English'}
        </button>
      </div>
      <div className="page-container">
        <h1 className="page-heading">
          {language === 'english' ? 'Embracing Your Menstrual Cycle' : 'तपाईंको मासिक चक्रलाई अँगाल्नुहोस्'}
        </h1>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Discovering the beauty of your menstrual cycle is an empowering journey that allows women to connect with their bodies on a profound level. Embracing the different phases of the menstrual cycle involves understanding the natural ebb and flow of hormonal changes throughout the month." :
                "तपाईंको मासिक धर्म चक्रको सुन्दरता पत्ता लगाउनु भनेको महिलाहरूलाई आफ्नो शरीरसँग गहिरो स्तरमा जडान गर्न अनुमति दिने सशक्तिकरण यात्रा हो। महिनावारी चक्रका विभिन्न चरणहरू अँगाल्नाले महिनाभरि हुने हर्मोनल परिवर्तनहरूको प्राकृतिक बहाव र प्रवाहलाई बुझ्नु समावेश छ।"}
            </p>
          </div>
          <img
            src="https://www.seema.com/wp-content/uploads/2023/03/Untitled-design-1350x761.jpg"
            alt="Image 2"
            className="paragraph-image2"
          />
        </div>

        <div className="paragraph-container reverse">
          <img
            src="https://images.herzindagi.info/image/2023/Feb/seasons-affect-periods.jpg"
            alt="Image 3"
            className="paragraph-image"
          />
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Each phase of the menstrual cycle brings unique qualities and opportunities for self-care. From the menstrual phase to ovulation and beyond, women can tailor their routines to align with the changing needs of their bodies, fostering a sense of harmony and well-being." :
                "मासिक चक्रको प्रत्येक चरणले आफ्नो विशेष गुण र स्वार्थका अवसरहरू ल्याउँछ। मासिक चक्रको चरणबाट अवधिदेखि ओभ्युलेसनसम्म, महिलाहरू आफ्नो देहको बदलाउने आवश्यकताहरूसँग समारूप गर्न सक्छन्, एक संगति र भलाइको भावना प्रोत्साहित गर्दै।"}
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Embracing your menstrual cycle is not just about acceptance; it's about celebrating the innate wisdom of the female body. By recognizing the cyclical nature of menstruation, women can navigate life with a deeper understanding of themselves and their inherent strength." :
                "तपाईंको मासिक चक्रलाई गल्ती गर्नुहोस् मात्र होइनस यसले महिला शरीरको प्राकृतिक ज्ञानलाई मनाउने क्रियाकलाप हो। मासिक धर्मको चक्राकार प्राकृतिकतालाई मान्यता दिनेर, महिलाहरू आफ्नो राम्रो र मौलिक शक्ति को गहिरो अवबोध सहित जीवन समारोह गर्न सक्छन्।"}
            </p>
          </div>
          <img
            src="https://www.brparents.com/wp-content/uploads/2022/11/BRPM_DEC22_WelcomeWomanhood.jpg"

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
