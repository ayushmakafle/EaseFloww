import React from 'react';
import './DoctorCard.css';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate()
  const {
    _id,
    username,
    specialization,
    hospitalOrClinic,
    address,
    officeHoursStart,
    officeHoursEnd,
    feesPerConsultation,
    officeDays,
  } = doctor;

  try {
    // Parse the officeDays string into an array of objects or use an empty array if falsy
    const parsedOfficeDays = officeDays ? JSON.parse(officeDays) : [];

    // Extract only the 'label' property from each day object
    const extractedOfficeDays = parsedOfficeDays.map((day) => day.label);

    return (
      <div className="doctor-card">
        <div className="doctor-name">{username}</div>
        <div className="doctor-specialization">{specialization}</div>
        <div className="hospital-info">
          <div>{hospitalOrClinic}</div>
          <div>{address}</div>
        </div>
        <div className="office-hours"style={{fontFamily: 'Raleway, sans-serif', fontWeight: "45" ,fontSize:"20px" }}>
          Office Hours: {officeHoursStart} - {officeHoursEnd}
        </div>
        <div className="office-days"style={{fontFamily: 'Raleway, sans-serif', fontWeight: "45" ,fontSize:"20px" }}>
          {extractedOfficeDays.length > 0 ? `Office Days: ${extractedOfficeDays.join(', ')}` : 'No Office Days'}
        </div>
        <br></br>
        <div className="fees"style={{ textAlign: 'center',color:'#ef5e99'}}>{`Fees per Consultation: NRs. ${feesPerConsultation}/-`}</div>
        <button className='btn btn-primary ms-1'
          style={{fontFamily: 'Raleway, sans-serif', fontWeight: "45" ,fontSize:"20px", color:"white",backgroundColor:"#e73d90" }}
          onClick={() => navigate(`/book-appointment/${_id}`)}
        >
          Book an Appointment
        </button>
      </div>
    );
  } catch (error) {
    console.error('Error parsing officeDays:', error);
    console.log('Raw officeDays value:', officeDays);
    return null; // You can handle this case differently based on your requirements
  }
};

export default DoctorCard;
