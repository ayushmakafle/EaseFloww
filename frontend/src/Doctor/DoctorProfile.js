import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorProfilePage = () => {
  const [doctorProfile, setDoctorProfile] = useState(null);

  useEffect(() => {
    // Assuming you have a function to get the doctor's profile by making an API request
    const fetchDoctorProfile = async () => {
      try {
        const response = await axios.get(`api/v1/auth/get-doctor/:did`);
        setDoctorProfile(response.data.doctor); // Assuming the doctor profile is returned as 'doctor' in the API response
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
        // Handle error
      }
    };

    fetchDoctorProfile();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="doctor-profile-container">
      <h2>My EaseFlow Doctor Profile</h2>

      {doctorProfile ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {doctorProfile.name}</p>
          <p><strong>Specialization:</strong> {doctorProfile.specialization}</p>
          <p><strong>Hospital or Clinic:</strong> {doctorProfile.hospitalOrClinic}</p>
          <p><strong>Address:</strong> {doctorProfile.address}</p>
          <p><strong>Phone Number:</strong> {doctorProfile.phoneNumber}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading doctor profile...</p>
      )}
    </div>
  );
};

export default DoctorProfilePage;
