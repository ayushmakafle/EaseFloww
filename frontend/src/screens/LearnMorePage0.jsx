// LearnMorePage0.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

// import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css';
import Footer from '../components/footer';

const LearnMorePage0 = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back
  };


  return (
    <>
      {/* <MainNavbar /> */}
      <div className="page-container">
<button className="back-button" onClick={goBack}>
          <span role="img" aria-label="Back Arrow" className="pink-arrow">❮❮</span> 
        </button>


        <h1 className="page-heading">Chhaupadi and menstruation taboos</h1>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
            Chhaupadi is an ancient tradition practised in some rural parts of Nepal. It involves banishing people, often young girls, to mud huts or sheds for the duration of their period, or even longer. It is believed they will otherwise bring their family bad luck, or ill health. 

Women, girls and people who menstruate are often left with little or no supplies, and no menstrual protection or washing facilities during their time away from home. This can cause a range of health issues, along with physical and psychological hardship.

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
            They might also be placed in considerable danger: there have been multiple reports of deaths in chhaupadi huts due to suffocation, fire, pneumonia and animal attacks.
Although chhaupadi has been illegal in Nepal since 2005, it is still practised in many communities. Such myths have been brought into discourse time and again through various media platforms. However, there are some more misconceptions, especially regarding menstrual health and hygiene, which are barely talked about.
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
            Many people consider period blood dirty and impure. They are conditioned that all the dirty and impure fluids from the body come out in the form of period blood, therefore, the one who is bleeding is also tagged impure in Nepali society.

But, there is no such thing as pure blood and impure blood. Period blood is not a way of throwing out toxins. It is a vaginal secretion that contains endometrium (mucus lining), uterine tissues, and very few amounts of blood.
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
              Understanding menstruation and its pain is crucial for promoting empathy and support
              for women. By acknowledging the naturalness of this process, we can foster a more
              compassionate and informed perspective on women's health.
            </p>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default LearnMorePage0;
