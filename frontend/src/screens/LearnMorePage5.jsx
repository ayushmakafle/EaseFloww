import React, { useState } from 'react';
// import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const LearnMorePage5 = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('english');

  const goBack = () => {
    navigate(-1);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'nepali' : 'english');
  };

  return (
    <>
      {/* <MainNavbar /> */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
  <button className="back-button" onClick={goBack} style={{ alignItems: 'center' }}>
    <span role="img" aria-label="Back Arrow" className="pink-arrow" style={{ color: '#f38dbc' }}>❮❮</span>
  </button>
  <button className="language-button btn light" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: "45", fontSize: "20px", color: "white", backgroundColor: "#e73d90", marginLeft: "1250px",marginTop: "10px" }} onClick={toggleLanguage}>
    {language === 'english' ? 'नेपालीमा पढनुहोस्' : 'Read in English'}
  </button>
</div>
      <div className="page-container">
        <h1 className="page-heading">
          {language === 'english' ? 'Connecting with Your Body' : 'आफ्नो शरीरलाइ बुझ्नुहोस्'}
        </h1>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Connecting with one's body during menstruation is a holistic approach that involves tuning into the body's signals, embracing its natural rhythms, and fostering a positive relationship with oneself. This connection extends beyond physical awareness to encompass emotional and spiritual well-being, creating a harmonious and empowering relationship with the self." :
                "मासिक धर्मको दौरान आफ्नो शरीरलाइ बुझ्नु एक पूर्णतात्मक दृष्टिकोण हो जसमा शरीरको संकेतहरूमा समान्तर हुने, तत्वज्ञानमा जोडिने, त्यसको प्राकृतिक रिदमा आनन्दित हुने, र आफ्नो साथीसँग सकारात्मक सम्बन्ध बढाउने समावेश गरिएको छ। यो जडान शारीरिक जागरूकताभन्दा प्राचीन र मानसिक तथा आध्यात्मिक कल्याणसम्म फैलिन्छ, जसले आत्मसँग सम्मोहनात्मक र शक्तिशाली सम्बन्ध सिर्जना गर्दछ।"}
            </p>
          </div>
          <img
            src="https://femina.wwmindia.com/content/2022/sep/periods-41663313160.jpg"
            alt="Image 1"
            className="paragraph-image2"
          />
        </div>

        <div className="paragraph-container reverse">
          <img
            src="https://resize.indiatvnews.com/en/centered/newbucket/1200_675/2023/01/adsescdddcdddddddddddq-1675001455.jpg"
            alt="Image 2"
            className="paragraph-image"
          />
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Building awareness of the body's signals throughout the menstrual cycle involves menstrual tracking. Observing changes in mood, energy levels, and physical sensations provides valuable insights into the cyclical nature of menstruation. Utilizing tracking methods facilitates a deeper understanding of individual patterns." :
                "मासिक धर्मको चक्रबाट शारीरिक संकेतहरूको जागरूकता तयार गर्न मासिक ट्र्याकिंग शामिल हुन्छ। मनसिक स्थिति, ऊर्जा स्तर, र शारीरिक अनुभूतिहरूमा परिवर्तनहरू देख्दा मासिक धर्मको चक्रिक प्रकृति बारेमा मौलिक अंदाजा लिन्छ। ट्र्याकिंग विधिहरूको प्रयोगले व्यक्तिगत नमुनाहरूको गहिरो समझ प्रस्तुत गर्दछ।"}
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Engaging in mind-body practices enhances self-awareness and emotional well-being. Practices such as meditation, yoga, or tai chi create opportunities for introspection, grounding, and centering. These practices contribute to a mindful and holistic connection with the body." :
                "मानसिक-शारीरिक अभ्यासमा सम्पलित हुनु आत्म-जागरूकता र भावनात्मक कल्याणलाई बढाउँछ। ध्यान, योग, वा ताई ची जस्ता अभ्यासहरूले आत्म-अवलोकन, आधारिता, र केन्द्रित गर्ने अवसर सिर्जना गर्दछ। यी अभ्यासहरूले शारीरिक साथिको मानसिक र पूर्णात्मक जडानमा सहयोग प्रदान गर्दछ।"}
            </p>
          </div>
          <img
            src="https://femina.wwmindia.com/content/2022/sep/periods-31663313142.jpg"
            alt="Image 3"
            className="paragraph-image"
          />
        </div>

        <div className="paragraph-container reverse">
          <img
            src="https://static.india.com/wp-content/uploads/2023/06/Menstruation-1.jpg?impolicy=Medium_Widthonly&w=700"
            alt="Image 4"
            className="paragraph-image"
          />
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Connecting with the body during menstruation includes actively listening to its needs. This may involve adjusting daily activities, dietary choices, and self-care practices based on the changing requirements of each menstrual phase. Responding with sensitivity fosters a compassionate relationship with oneself." :
                "मासिक धर्मको दौरान शारीरिक जडानमा आफ्नो आवश्यकताहरू सक्रिय रुपमा सुन्नु समावेश गर्छ। यो दैनिक कार्यहरू, आहारको छनोट, र प्रत्येक मासिक चरणको परिवर्तनशील आवश्यकताहरूका आधारमा आफ्नो कार्यहरूलाई समायोजन गर्न सक्छ। संवेदनशीलतासहितको प्रतिक्रिया दिनु आफ्नोसँग दयालु सम्बन्ध बढाउँछ।"}
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Embracing the unique aspects of femininity associated with the menstrual cycle is a powerful aspect of connecting with the body. Celebrating the strengths, resilience, and intuition that come with being a woman during menstruation contributes to a positive self-image and fosters a sense of empowerment." :
                "मासिक धर्म सम्बन्धित महिलावादी अनौपचारिक पक्षहरू समावेश गर्नु शरीरसँग जडान गर्नको एक शक्तिशाली पक्ष हो। महिला हुनुमा आउने शक्ति, सहनशीलता, र अवधारणामा समावेश गर्ने खासै खासै गुणहरू यात्रिको सकारात्मक आत्म-चित्र र शक्तिशाली भावनालाई बढाउँछ।"}
            </p>
          </div>
          <img
            src="https://images.herzindagi.info/image/2023/Feb/how-to-deal-with-seasons-affecting-menstrual-cycle.jpg"
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
