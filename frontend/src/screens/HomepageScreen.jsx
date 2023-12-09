import React from 'react';
import { Link } from 'react-router-dom';
import MainNavbar from '../components/Navbar';
import Footer from '../components/footer';
import './HomepageScreen.css';

const HomepageScreen = () => {
  const contentData = [
    {
      title: 'Understanding Menstruation Pain',
      description:
        'Welcome to our sweet and informative space where we discuss the natural process of menstruation and the common companion, menstrual pain.',
       },
    {
      title: 'Embracing Your Menstrual Cycle',
      description:
        'Discover the beauty of your menstrual cycle and learn how to embrace its different phases with love and care.',
       },
    {
      title: 'Self-Care During Menstruation',
      description:
        'Explore simple and effective self-care practices to make your menstruation days more comfortable and enjoyable.',
       },
    {
      title: 'Menstruation and Hormonal Changes',
      description:
        'Understand how hormonal changes during menstruation play a vital role in your overall well-being and health.',
       },
    {
      title: 'Nutrition Tips for Menstruating Women',
      description:
        'Discover nutritional strategies to support your body during menstruation and enhance your overall health.',
       },
    {
      title: 'Connecting with Your Body',
      description:
        'Learn the importance of connecting with your body and listening to its needs during the menstrual cycle.',
       },
    {
      title: 'Menstruation Myths Busted',
      description:
        'Unravel common myths surrounding menstruation and gain insights into the facts about this natural process.',
       },
    {
      title: 'Celebrating Femininity',
      description:
        'Celebrate the essence of femininity and the unique strength that comes with being a woman during menstruation.',
      }
  ];
  return (
    <>
      <MainNavbar />
      <div className="home-page">
        <div className="content-container">
          {contentData.map((content, index) => (
            <div className="info-container" key={index}>
              <div className="text-content">
                <Link to={`/learn-more/${index}`} style={{ textDecoration: 'none' }}>
                  <button className="learn-more-button">
                  <h1>{content.title}</h1>
                   <p>{content.description}</p>
                  </button>
                </Link>
              </div>
             
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomepageScreen;
