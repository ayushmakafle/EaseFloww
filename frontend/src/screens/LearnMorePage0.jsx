import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css';
import Footer from '../components/footer';

const LearnMorePage0 = () => {
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
  <button className="back-button" onClick={goBack} style={{ alignItems: 'center' }}>
    <span role="img" aria-label="Back Arrow" className="pink-arrow" style={{ color: '#f38dbc' }}>❮❮</span>
  </button>
  <button className="language-button btn light" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: "45", fontSize: "20px", color: "white", backgroundColor: "#e73d90", marginLeft: "1250px",marginTop: "10px" }} onClick={toggleLanguage}>
    {language === 'english' ? 'नेपालीमा पढनुहोस्' : 'Read in English'}
  </button>
</div>
      <div className="page-container">
        <h1 className="page-heading">{language === 'english' ? 'Chhaupadi and menstruation taboos' : 'छाउपडी र मासिक धर्मको वर्जित'}</h1>
        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Chhaupadi is an ancient tradition practised in some rural parts of Nepal. It involves banishing people, often young girls, to mud huts or sheds for the duration of their period, or even longer. It is believed they will otherwise bring their family bad luck, or ill health." :
                "छाउपडी नेपालका केही गाउँ तथा गाउँपालिकामा अम्लीन संस्कृति हो। यसमा व्यक्तिहरूलाई, बिशेष गरी केही नौवा, उनीहरूलाई तह दिनेहरू, ठूला वा बढी समयका लागि काठको झुवारमा वा गोठमा बहाल गरिन्छ। यसको अर्थ के हो, यसमा विश्वास छ कि अन्यथा उनीहरूले आफ्नो परिवारलाई कुर्प्या वा केहि खराब स्वास्थ्य ल्याउन सक्छन्।"}
            </p>
          </div>
          <img
            src="https://english.onlinekhabar.com/wp-content/uploads/2022/07/menstruation-friendly-office-poster-1536x1152.jpg"
            alt="Image 1"
            className="paragraph-image"
          />
        </div>

        <div className="paragraph-container reverse">
          <img
            src="https://assets-cdn.kathmandupost.com/uploads/source/news/2019/health/Menstural-Woes1.jpg"
            alt="Image 2"
            className="paragraph-image2"
          />
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "They might also be placed in considerable danger: there have been multiple reports of deaths in chhaupadi huts due to suffocation, fire, pneumonia and animal attacks. Although chhaupadi has been illegal in Nepal since 2005, it is still practised in many communities. Such myths have been brought into discourse time and again through various media platforms. However, there are some more misconceptions, especially regarding menstrual health and hygiene, which are barely talked about." :
                "तिनीहरूलाई धेरै खतरामा राखिन्छस् छाउपडी झुवारहरूमा अस्फालन, आग, फोक्सा, न्युमोनिया र पशु हमलाहरूका कारण मृत्युको कई प्रतिवेदन आएका छन्। यसको बावजूद, २००५ देखि छाउपडी नेपालमा गैरकानुनी भएको छ, तर यसलाई धेरै समुदायमा लागू गरिएको छ। यस्ता गलतफहमीहरू समय समयमा विभिन्न मिडिया प्लेटफर्महरूबाट चर्चा गर्नु आएका छन्। तथापि, मासिक धर्म र स्वच्छता सम्बन्धी विभिन्न गलतफहमीहरू जसलाई बारम्बार छलफल गरिएको छ, जसलाई छानबिन कम गरिएको छ।"}
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Many people consider period blood dirty and impure. They are conditioned that all the dirty and impure fluids from the body come out in the form of period blood, therefore, the one who is bleeding is also tagged impure in Nepali society. But, there is no such thing as pure blood and impure blood. Period blood is not a way of throwing out toxins. It is a vaginal secretion that contains endometrium (mucus lining), uterine tissues, and very few amounts of blood." :
                "धेरै मानिसहरूले मासिक धर्मको रातो र अशुद्ध मान्छेको रातो र अशुद्ध मानिन्छन्। तिनीहरूले आफ्नो शरीरबाट सबै अशुद्ध र अशुद्ध तरलहरू मासिक धर्मको रूपमा निस्कन्छन्, यसकारण जो सिरन्धन गरिरहेको छ, उहाँ पनि नेपाली समाजमा अशुद्ध मानिन्छ। तर, पावित्र्य र अशुद्ध रक्तको कुनै पनि कुरा छैन। मासिक धर्म विषैले रसाइरहेको तरल हो। यसमा इन्डोमेट्रियम ९म्युकस सामग्री०, जरायको कोशिकाहरू, र धेरै थप रक्त मात्रामा समावेश छ।"}
            </p>
          </div>
          <img
            src="https://assets-cdn.kathmandupost.com/uploads/source/news/2019/health/Chhaupadi-28052019074946.jpg"
            alt="Image 3"
            className="paragraph-image"
          />
        </div>

        <div className="paragraph-container reverse">
          <img
            src="https://www.unwomen.org/sites/default/files/Headquarters/Images/Sections/News/Stories/2017/Nepal_UNTF_group-photo-doti-TH_675x450.jpg?la=en"
            alt="Image 4"
            className="paragraph-image2"
          />
          <div className="text-box">
            <p className="page-paragraph">
              {language === 'english' ?
                "Understanding menstruation and its pain is crucial for promoting empathy and support for women. By acknowledging the naturalness of this process, we can foster a more compassionate and informed perspective on women's health." :
                "मासिक धर्म र तत्सम दुख अम्लीन महिलाहरूको लागि सहानुभूति र समर्थन बढाउनको लागि अत्यन्त आवश्यक छ। यस प्रक्रियाको प्राकृतिकतालाई स्वीकार्दै, हामी महिलाहरूको स्वास्थ्यमा एकदमी दयालु र सूचित दृष्टिकोण बिकास गर्न सक्छौं।"}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LearnMorePage0;
