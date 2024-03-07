import React, { useState } from 'react';
// import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css'; // Use the same CSS file for consistency
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const LearnMorePage2 = () => {
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
      <button className="back-button" onClick={goBack}>
          <span role="img" aria-label="Back Arrow" className="pink-arrow">❮❮</span>
        </button>
        
        <button className="language-button btn light" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: "45" ,fontSize:"20px", color:"white",backgroundColor:"#e73d90" }} onClick={toggleLanguage}>
          {language === 'english' ? 'नेपालीमा पढ्नुहोस्' : 'Read in English'}
        </button>
      <div className="page-container">
        <h1 className="page-heading">
          {language === 'english' ? 'Self-Care During Menstruation' : 'मासिक धर्मको दौरान स्वास्थ्य सेवा'}
        </h1>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "A fundamental aspect of self-care during menstruation is prioritizing rest and relaxation. Menstrual cycles can bring about fatigue and discomfort, making it crucial to allow oneself sufficient time for restful sleep and moments of relaxation. Creating a serene environment and acknowledging the need for downtime contributes significantly to overall well-being." :
                "मासिक धर्मको दौरान स्वास्थ्य सेवा गर्ने एक मुख्य पहलू आराम र विश्रामलाई प्राथमिकता दिन हो। मासिक चक्रले थकान र असहनी ल्याउन सक्दछ, जसले आफ्नो लागि शान्तिपूर्ण निद्रा र विश्रामको क्षणहरू अनुमति दिने आवश्यक बनाउँछ। एक शान्त वातावरण सिर्जना गर्ने र डाउनटाइमको आवश्यकतालाई स्वीकार्ने सामान्य भलाइमा महत्त्वपूर्ण योगदान गर्दछ।"}
            </p>
          </div>
          <img
            src="https://cdn.dribbble.com/users/1374484/screenshots/18391931/media/f8a3ecd8450ca39f91e733a56efbb116.jpg"
            alt="Image 1"
            className="paragraph-image2"
          />
        </div>

        <div className="paragraph-container reverse">
          <img
            src="https://leadership.ng/wp-content/uploads/2024/02/Menstrual-Health.jpg"
            alt="Image 2"
            className="paragraph-image"
          />
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Maintaining optimal hydration levels and focusing on nutritious foods are key components of self-care during menstruation. Drinking plenty of water helps manage bloating and supports the body in eliminating waste. A balanced diet with a focus on iron-rich foods is essential to replenish nutrients lost during menstruation, contributing to sustained energy levels." :
                "मासिक धर्मको दौरान आदर्श हाइड्रेशन स्तरको राख्नु र पौष्टिक खाद्यहरूमा ध्यान केन्द्रित गर्नु स्वास्थ्य सेवाको कुँद्रकहरू हुन्। पानी पिउँदा नापाईने खुच्री व्यवस्थापन गर्न मद्दत गर्दछ र शरीरलाई कुरा साफ गर्न मद्दत गर्दछ। लौह युक्त खाना प्राधान्य दिने संतुलित खाना मासिक धर्मको दौरान खोइने पोषक तत्वहरू पुनर्स्थापन गर्न आवश्यक छ, जसले लागि जोगाउने ऊर्जाको स्तिथि मा सहयोग गर्दछ।"}
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Choosing comfortable clothing and utilizing menstrual products that align with personal preferences contribute to a sense of comfort and well-being. Furthermore, incorporating small indulgences, such as warm baths, herbal teas, or enjoying a favorite book or movie, can provide moments of pampering and self-nurturing during the menstrual cycle." :
                "आफ्नो व्यक्तिगत पसन्दसँग मेल खाने र मासिक धर्म उत्पादनहरू प्रयोग गर्ने खुशी र स्वास्थ्यको एक अहसासमा सहयोग गर्दछ। थप बहुमूल्यता जोड्नु, जस्तै गरम गर्म नहारा, औषधीय चिया, वा मनपर्ने पुस्तक वा फिल्मको आनन्द लिनु, मासिक धर्मको दौरान पम्परिंग र आत्मा-पोषणका क्षणहरू प्रदान गर्दछ।"}
            </p>
          </div>
          <img
            src="https://static.india.com/wp-content/uploads/2023/06/Menstruation-1.jpg?impolicy=Medium_Widthonly&w=700"
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
