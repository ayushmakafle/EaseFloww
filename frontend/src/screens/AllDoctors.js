import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import MainNavbar from '../components/Navbar';
import DoctorCard from '../components/DoctorCard';
import axios from 'axios';
import animation from '../components/finddoctor.json';
import Lottie from 'lottie-react';

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/v1/auth/get-doctor');
      if (response.data.success) {
        setDoctors(response.data.doctors);
      } else {
        console.error('Error fetching doctors:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []); // Run this effect only once on component mount

  return (
 <>
    {/* <MainNavbar /> */}
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1', maxWidth: '20%', marginTop:'40px' }}>
        <Lottie
          animationData={animation}
          className="lottie-animation-home cursor-pointer"
        />
        <h4 style={{ textAlign: 'center', color: '#ff0066', marginTop: '20px' }}>
          Discover EaseFlow: Your Trusted Path to Wellness – Find the Perfect Doctor Today
        </h4>
      </div>
      
      <div style={{ flex: '1' }}>
        <h1 style={{ textAlign: 'center', color: '#ef5e99', marginTop: '20px' }}>
          EaseFlow Doctors
        </h1>

        <div className="doctor-cards-container" 
          style={{ cursor: 'pointer', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {doctors.map((doctor) => (
            <Link key={doctor._id} to={`/book-appointment/${doctor._id}`} style={{textDecoration:'none'}}>
              <DoctorCard doctor={doctor} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  </>
  );
};

export default AllDoctors;
