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
      <div className="page-container">
        <button className="back-button" onClick={goBack}>
          <span role="img" aria-label="Back Arrow" className="pink-arrow">❮❮</span>
        </button>
        <button className="language-button" onClick={toggleLanguage}>
          {language === 'english' ? 'नेपालीमा पढ्नुहोस्' : 'Read in English'}
        </button>
        <h1 className="page-heading">
          {language === 'english' ? 'Embracing Your Menstrual Cycle' : 'तपाईंको मासिक चक्रलाई गल्ती गर्नुहोस्'}
        </h1>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Discovering the beauty of your menstrual cycle is an empowering journey that allows women to connect with their bodies on a profound level. Embracing the different phases of the menstrual cycle involves understanding the natural ebb and flow of hormonal changes throughout the month." :
                "तपाईंको मासिक चक्रको सुन्दरताको खोजी एक शक्तिशाली यात्रा हो जो महिलाहरूलाई आफ्नो शरीरसँग एक गहिरो स्तरमा जडान गर्न अनुमति दिन्छ। मासिक चक्रको विभिन्न चरणहरूलाई गल्ती गर्न गर्ने महिलाहरूले महिनाको अवस्थानिक हार्मोनियल परिवर्तनको प्राकृतिक अप्रिय र बहाल गर्ने रहँमा गलती गर्दछ।"}
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
                "तपाईंको मासिक चक्रलाई गल्ती गर्नुहोस् मात्र होइन; यसले महिला शरीरको प्राकृतिक ज्ञानलाई मनाउने क्रियाकलाप हो। मासिक धर्मको चक्राकार प्राकृतिकतालाई मान्यता दिनेर, महिलाहरू आफ्नो राम्रो र मौलिक शक्ति को गहिरो अवबोध सहित जीवन समारोह गर्न सक्छन्।"}
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
