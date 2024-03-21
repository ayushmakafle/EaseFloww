import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import MainNavbar from '../components/Navbar';
import Footer from '../components/footer';
import './HomepageScreen.css';

const HomepageScreen = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Navigate back
  };
  const contentData = [
    {
      
      title: 'Menstruation Myths in Nepal',
      description:
        'Breaking the silence on menstruation in Nepal is essential to challenge deep-rooted taboos and foster a culture of openness and understanding.',
      imagePath: 'https://english.onlinekhabar.com/wp-content/uploads/2020/10/Menstruation.jpg',
    },

    {
      title: 'Embracing Your Menstrual Cycle',
      description:
        'Discover the beauty of your menstrual cycle and learn how to embrace its different phases with love and care.',
      imagePath: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2020_50/1640991/cycles-jc-202411.png',
    },
    {
      title: 'Self-Care During Menstruation',
      description:
        'Explore simple and effective self-care practices to make your menstruation days more comfortable and enjoyable.',
      imagePath: 'https://img.freepik.com/free-vector/women-climacteric-concept_23-2148653174.jpg?w=740&t=st=1701970017~exp=1701970617~hmac=111dedc56b93574d7ee231c3a783fd61678865e8e0addfd6fdc4d6dd68dc68df',
    },
    {
      title: 'Menstruation and Hormonal Changes',
      description:
        'Understand how hormonal changes during menstruation play a vital role in your overall well-being and health.',
      imagePath: 'https://img.freepik.com/free-vector/stages-menstrual-cycle_1308-133970.jpg?w=740&t=st=1701970024~exp=1701970624~hmac=4030addbbbea0c9fc9e38986bc578a4eda1245744d62421d633c918e837ac278',
    },
    {
      title: 'Nutrition Tips for Menstruating Women',
      description:
        'Discover nutritional strategies to support your body during menstruation and enhance your overall health.',
      imagePath: 'https://img.freepik.com/free-vector/menstrual-calendar-concept_23-2148672116.jpg?w=740&t=st=1701969830~exp=1701970430~hmac=bbab433301c7701fc20302eb6b72c16046f78e38ad58ccaad080355011483f75',
    },
    {
      title: 'Connecting with Your Body',
      description:
        'Learn the importance of connecting with your body and listening to its needs during the menstrual cycle.',
      imagePath: 'https://img.freepik.com/free-photo/top-view-period-related-things_23-2148162967.jpg?w=996&t=st=1701969965~exp=1701970565~hmac=3502ffd7c3a5efc2afa6e0744dd7223af0d41c0f5b5f361f514474e2e5778aa7',
    },
    /*  {
       title: 'Menstruation Myths Busted',
       description:
         'Unravel common myths surrounding menstruation and gain insights into the facts about this natural process.',
       imagePath: 'https://img.freepik.com/free-vector/stages-menstrual-cycle_1308-133708.jpg?w=740&t=st=1701969827~exp=1701970427~hmac=e3a84c6ebb3ed9257f4c710d9de98c18dcbde937afefb797ca51888fa10c2a78',
     },
     {
       title: 'Celebrating Femininity',
       description:
         'Celebrate the essence of femininity and the unique strength that comes with being a woman during menstruation.',
       imagePath: 'https://img.freepik.com/free-vector/women-climacteric-concept-with-clock_23-2148654454.jpg?w=740&t=st=1701969836~exp=1701970436~hmac=ce86e133c305a24f91393544f18b7ca82349aef4726cbb7fd6fd35141a71cbb2',
     } */
  ];
  return (
    <>
      {/* <MainNavbar /> */}
      <button className="back-button" onClick={goBack} style={{ alignItems: 'center' }}>
        <span role="img" aria-label="Back Arrow" className="pink-arrow" style={{ color: '#f38dbc' }}>❮❮</span>
      </button>
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
              <div className="image-container">
                <img
                  src={content.imagePath}
                  alt={`Illustration ${index}`}
                  style={{ border: '2px solid #ccc', borderRadius: '8px', maxWidth: '300px' }}
                />
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
