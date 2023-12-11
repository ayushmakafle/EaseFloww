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
          <h1 className="page-heading"> "We aren't given nutritious food, and we are not treated like humans."</h1>
          <p className="page-paragraph">
          Menstruation is a physiological process that takes place in the body of a female every month, 
          yet menstruation in Nepal remains to be taboo as it is in many cultures throughout the world.
          Menstruation in Nepal is stigmatised, misunderstood, and mythologised. So, it is important to study menstruation 
          and debunk some popular myths and misconceptions. But how can it be done?
          </p>
          <img src="https://english.onlinekhabar.com/wp-content/uploads/2022/07/menstruation-friendly-office-poster-1536x1152.jpg" alt="Image 1" className="paragraph-image" />
        </div>

        <div className="paragraph-container">
          <p className="page-paragraph">
          Women, girls and people who menstruate are often left with little or no supplies, 
          and no menstrual protection or washing facilities during their time away from home. 
          This can cause a range of health issues, along with physical and psychological hardship.
          </p>
          <img src="https://thehimalayantimes.com/uploads/imported_images/wp-content/uploads/2016/11/Chhaupadi-shed-in-Bajura-district.jpg" alt="Image 2" className="paragraph-image2" />
        </div>

        <div className="paragraph-container">
          <p className="page-paragraph">
          Without access to sanitary pads, she has to use rags to soak up the blood. 
          These can cause serious and painful infections. Alone and isolated in the chhaupadi hut, 
          Ishu misses the comforts of home: "I can't bring warm clothes to the hut—that's why I feel cold in the winter. 
          There are no windows and during the summer season I feel really warm." 
          </p>
          <img src="https://www.actionaid.org.uk/sites/default/files/styles/hero_large/public/207738-full.jpg?h=74d68f78&itok=V52CDujp" alt="Image 4" className="paragraph-image2" />
        </div>
        <div className="paragraph-container">
          <p className="page-paragraph">
          Since ActionAid began working in Nepal, more than 1,400 women of reproductive age have stopped practising chhaupadi. 
          In the last five years, ActionAid - alongside local partners - has helped to establish at least 11 'chhaupadi-free' 
          communities, and through awareness raising initiatives, people's beliefs around menstruation are changing. "I hope that, 
          whatever we have faced now, girls will not be able to face this kind of discrimination in the future," Rajkumari says.
          </p>
          <img src="https://www.actionaid.org.uk/sites/default/files/styles/full_width_large/public/storieshub/rs_207961.jpeg?h=74d68f78&itok=nPrMi8Pi" alt="Image 3" className="paragraph-image" />
        </div>

      </div>
      <p>https://www.actionaid.org.uk/our-work/period-poverty/chhaupadi-and-menstruation-taboos</p>
      <Footer />
    </>
  );
};

export default LearnMorePage0;
