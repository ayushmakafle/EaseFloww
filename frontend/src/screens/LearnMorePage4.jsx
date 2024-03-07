import React, { useState } from 'react';
// import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css'; // Use the same CSS file for consistency
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const LearnMorePage4 = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('english'); // default language is English

  const goBack = () => {
    navigate(-1);
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
          {language === 'english' ? 'Nutrition Tips for Menstruating Women' : 'महिलावारी हुने महिलाका लागि पोषण युक्तिहरू'}
        </h1>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Nutrition plays a pivotal role in supporting women's health, particularly during menstruation. A well-balanced diet can address nutritional needs, alleviate symptoms, and contribute to an overall sense of well-being during the menstrual cycle. Tailoring dietary choices to support the body's demands during menstruation is an empowering aspect of women's health." :
                "विशेष गरी महिनावारीको समयमा महिलाको स्वास्थ्यलाई समर्थन गर्न पोषणले महत्त्वपूर्ण भूमिका खेल्छ। एक राम्रो सन्तुलित आहारले पोषण आवश्यकताहरू सम्बोधन गर्न, लक्षणहरू कम गर्न, र मासिक धर्म चक्रको समयमा कल्याणको समग्र भावनामा योगदान दिन सक्छ। महिनावारीको समयमा शरीरको मागलाई समर्थन गर्न आहार विकल्पहरू मिलाउनु महिलाको स्वास्थ्यको सशक्त पक्ष हो।"}
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
                "Menstruation often leads to a loss of iron, making it crucial to include iron-rich foods in the diet. Leafy greens, lean meats, legumes, and fortified cereals are excellent sources of iron. Adequate iron intake helps prevent anemia and supports overall energy levels." :
                "महिनावारीले प्रायः फलामको कमी निम्त्याउँछ, जसले यसलाई आहारमा फलाम युक्त खानेकुराहरू समावेश गर्न महत्त्वपूर्ण बनाउँछ। पातदार सागपात, दुबला मासु, फलफूल र बलियो अनाजहरू फलामका उत्कृष्ट स्रोत हुन्। पर्याप्त फलामको सेवनले एनिमियाबाट बच्न र समग्र ऊर्जालाई समर्थन गर्दछ। स्तरहरू।"}

            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Supporting bone health is vital for women, especially during menstruation. Consuming calcium-rich foods, such as dairy products, and ensuring sufficient vitamin D through exposure to sunlight or fortified foods contributes to strong and healthy bones." :
                "विशेष गरी महिनावारीको समयमा महिलाहरूको लागि हड्डीको स्वास्थ्यलाई समर्थन गर्नु महत्त्वपूर्ण छ। क्याल्सियम युक्त खानेकुराहरू, जस्तै डेयरी उत्पादनहरू, र पर्याप्त भिटामिन डी सुनिश्चित गर्न सूर्यको किरण वा सुदृढ खाद्य पदार्थहरूको प्रयोगले बलियो र स्वस्थ हड्डीहरूमा योगदान पुर्‍याउँछ।"}
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
                "Staying well-hydrated is essential for managing bloating and maintaining overall health. Additionally, incorporating foods rich in omega-3 fatty acids, such as fatty fish, flaxseeds, and walnuts, can help reduce inflammation and ease menstrual discomfort." :
                "राम्रोसँग हाइड्रेटेड रहनु ब्लोटिंग प्रबन्ध गर्न र समग्र स्वास्थ्य कायम राख्न आवश्यक छ। थप रूपमा, ओमेगा-3 फ्याटी एसिडमा धनी खानाहरू समावेश गर्नाले फ्याटी माछा, फ्ल्याक्ससीडहरू र ओखरको रूपमा, सूजन कम गर्न र महिनावारीको असुविधालाई कम गर्न मद्दत गर्न सक्छ।"}
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Moderating caffeine and sugar intake is advisable during menstruation. Excessive consumption of these substances can exacerbate symptoms like irritability and cramps. Opting for alternatives and mindful consumption supports better overall health." :
                "महिनावारीको समयमा क्याफिन र चिनीको सेवनलाई मध्यस्थ गर्न सल्लाह दिइन्छ। यी पदार्थहरूको अत्यधिक उपभोगले चिडचिडापन र क्र्याम्पजस्ता लक्षणहरू बढाउन सक्छ। वैकल्पिक उपायहरू र सावधानीपूर्वक सेवन गर्नाले राम्रो समग्र स्वास्थ्यलाई समर्थन गर्दछ।"}

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
