import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';
import axios from 'axios';
import animation from '../components/finddoctor.json';
import Lottie from 'lottie-react';
import Loading from '../components/loadinganimation.svg'; 

const AllDoctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true); 
  const goBack = () => {
    navigate(-1); // Navigate back
  };
  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/v1/auth/get-doctor');
      if (response.data.success) {
        setDoctors(response.data.doctors);
        setLoading(false);
      } else {
        console.error('Error fetching doctors:', response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <>
          <button className="back-button" onClick={goBack} style={{ alignItems: 'center' }}>
        <span role="img" aria-label="Back Arrow" className="pink-arrow" style={{ color: '#f38dbc' }}>❮❮</span>
      </button>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1', maxWidth: '25%', marginTop: '60px' }}>
          <Lottie
            animationData={animation}
            className="lottie-animation-home cursor-pointer"
          />
          <h4 style={{ textAlign: 'center', color: '#ff0066', marginTop: '20px' }}>
          </h4>
        </div>

        <div style={{ flex: '1' }}>
          <h1 style={{ textAlign: 'center', color: '#ef5e99', marginTop: '20px', fontWeight: 'bold' }}>
            Find the perfect doctor for you today!
          </h1>

          <div className="doctor-cards-container"
            style={{ cursor: 'pointer', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {loading ? ( 
              <div className="text-center">
                <img src={Loading} alt="Loading" />
              </div>
            ) : (
              doctors.map((doctor) => (
                <Link key={doctor._id} to={`/book-appointment/${doctor._id}`} style={{ textDecoration: 'none', minWidth: '40%' }}>
                  <DoctorCard doctor={doctor} />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllDoctors;
