import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainNavbar from '../components/Navbar';
import DoctorCard from '../components/DoctorCard';
import axios from 'axios';

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
      <MainNavbar />
      <h1>EaseFlow Doctors</h1>

      <div className="doctor-cards-container" style={{cursor:'pointer'}}>
        {doctors.map((doctor) => (
          <Link key={doctor._id} to={`/book-appointment/${doctor._id}`}>
            <DoctorCard doctor={doctor} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default AllDoctors;
