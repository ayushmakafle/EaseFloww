import React, { useState } from 'react';
// import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const LearnMorePage3 = () => {
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
          {language === 'english' ? 'Menstruation and Hormonal Changes' : 'मासिक धर्म र हार्मोनियल परिवर्तनहरू'}
        </h1>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Menstruation is intricately tied to hormonal changes that occur throughout the menstrual cycle. Understanding the nuances of these hormonal fluctuations is essential for gaining insights into the physiological and emotional shifts that women experience. The menstrual cycle consists of distinct phases, each characterized by unique hormonal patterns that influence various aspects of a woman's health." :
                "मासिक धर्म गर्दा हार्मोनियल परिवर्तनहरूसँग गहिरो जडान गरिएको छ। यी हार्मोनियल फ्लक्चुएसनका सूक्ष्मताहरू समझ्न आवश्यक छ भने पुरुषहरूले अनुभव गर्ने शारीरिक र भावनात्मक परिवर्तनहरूमा अन्तर्दृष्टि प्राप्त गर्न आवश्यक छ। मासिक चक्र विभिन्न चरणहरूमा छ, प्रत्येक चरणले विभिन्न हार्मोनियल प्रतिरूपहरूको चिन्हाहरूको साथमा हो, जसले विभिन्न पक्षहरू लागि स्त्रीहरूको स्वास्थ्यमा प्रभाव गर्दछ।"}
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
              {language === 'english' ?
                "Two key hormones, estrogen and progesterone, play pivotal roles in orchestrating the menstrual cycle. Estrogen rises during the follicular phase, promoting the maturation of eggs, while progesterone dominates the luteal phase, preparing the uterus for a potential pregnancy. The delicate dance between these hormones regulates the ebb and flow of the menstrual cycle." :
                "दोश्रो कुञ्जीय हार्मोनहरू, एस्ट्रोजेन र प्रोगेस्टेरोन, मासिक चक्रलाई सम्बोधन गर्दा महत्त्वपूर्ण भूमिका खेल्छन्। एस्ट्रोजेन फोलिकुलर चरणमा उच्चार हुँदैछ, अण्डाहरूको परिपक्वता प्रोत्साहित गर्दै, जबकि प्रोगेस्टेरोन लुटेअल चरणलाई आग्रह गर्दछ, गर्भावस्थामा सम्भावित गर्न गर्ने भएको गर्भाशय तयार गर्दै। यी हार्मोनहरूको बिचको सूक्ष्म नृत्य मासिक चक्रको धारा र फिस्लेको विनियमन गर्दछ।"}
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Hormonal changes exert a profound influence on mood and energy levels. Women may experience fluctuations in mood, ranging from heightened energy during ovulation to potential mood swings and fatigue premenstrually. Recognizing and acknowledging these variations fosters a greater understanding of the mind-body connection inherent in the menstrual cycle." :
                "हार्मोनियल परिवर्तनले भावनामा र ऊर्जा स्तरमा गहिरो प्रभाव गर्छ। महिलाहरू उच्च ऊर्जा प्राप्त गर्दा अवलोकनयोग्य ऊर्जा तिरेका आवश्यकतामा बदलाव हुन सक्छ, जुन एउटा साथमा महसूस गर्दछ अनि प्रागभाविक र थकान प्रागबालिक मासिक धर्म प्रारंभ गर्दा। यी विविधताहरू चिन्हानु र मान्यता गर्नु, मासिक धर्मको अंतर्मुखिय जडानमा अधिक अवधारणा गर्दछ।"}
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
              {language === 'english' ?
                "Imbalances in hormonal levels can contribute to menstrual disorders, such as irregular periods, premenstrual syndrome (PMS), and conditions like polycystic ovary syndrome (PCOS). Addressing hormonal health through lifestyle factors like regular exercise, a balanced diet, and stress management becomes crucial for promoting overall well-being." :
                "हार्मोनियल स्तरको असमत्ता मासिक धर्मको रोगहरूमा योगदान गर्दछ, जस्तै अनियमित अवधिहरू, प्राग्भाविक सिंड्रोम (पिएमएस), र पोलिसिस्टिक ओव्यारी सिंड्रोम (पीसीओएस) जस्ता स्थितिहर। नियमित व्यायाम, संतुलित खाना, र तनाव प्रबन्धन जस्ता जीवनशैली अंशमा हार्मोनियल स्वास्थ्यलाई ठीक गर्नु आवश्यक हुन्छ जसले समग्र स्वास्थ्यको प्रचार गर्दछ।"}
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Maintaining hormonal balance is paramount for reproductive health, fertility, and overall well-being. By adopting a holistic approach to health, women can support their hormonal systems through nourishing foods, regular exercise, and mindfulness practices. The recognition of the intricate interplay between hormones and health underscores the significance of hormonal well-being throughout a woman's life." :
                "प्रजनन स्वास्थ्य, उपजाऊता, र समग्र स्वास्थ्यका लागि हार्मोनियल संतुलनको बनाधार छ। सम्पूर्ण स्वास्थ्यको पक्षमा एक समग्र दृष्टिकोण अपनाउँदा, महिलाहरूले स्वास्थ्यलाई पोषक खाना, नियमित व्यायाम, र साबधानी व्यायाम प्रशिक्षणको माध्यमबाट हार्मोनियल प्रणालीलाई समर्थन गर्न सक्छन्। हार्मोनहरू र स्वास्थ्य बीचको संगठनको जटिलताको मान्यता गर्दै हार्मोनियल स्वास्थ्यको महत्त्व यसको जीवनभरीमा रहेको छ।"}
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
