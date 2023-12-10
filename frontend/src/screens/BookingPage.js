import React, { useEffect, useState } from 'react';
import MainNavbar from '../components/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment'; //js library to parse,validate,manipulate date object
import './BookingPage.css';
import { useAuth } from '../context/auth';
import {toast} from 'react-toastify';

const BookingPage = () => {

    const params = useParams()
    const [auth] = useAuth()

  const [doctor, setDoctor] = useState(null);
  const { doctorId } = useParams();
  const [date,setDate] = useState()
  const [time,setTime] = useState()
  const [isAvailable,setIsAvailable] = useState()


  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`/api/v1/auth/get-doctor/${doctorId}`);
        if (response.data.success) {
          setDoctor(response.data.data);
        } else {
          console.error('Error fetching doctor:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching doctor:', error.message);
      }
    };
    fetchDoctor();
  }, [doctorId]);


 //handle availability
  const handleAvailability = async () => {
    try {
      const res = await axios.post(
        "/api/v1/appointment/booking-availability",
        { doctorId: params.doctorId, date, time },
      );
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

//booking
  const handleBooking = async () => {
    try {
      setIsAvailable(true)
      if(!date && !time){
        return alert("date and time required")
      } 
      const res = await axios.post(`/api/v1/appointment/book-appointment`, {
        doctorID: params.doctorId, 
        userID: auth.user._id,
        doctorInfo: doctor,
        userInfo: auth.user,
        date: date,
        time: time 
      });

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Render loading state
  if (!doctor) {
    return (
      <>
        <MainNavbar />
        <p>Loading...</p>
      </>
    );
  }

  // Parse the officeDays string into an array of objects or use an empty array if falsy
  const parsedOfficeDays = doctor.officeDays ? JSON.parse(doctor.officeDays) : [];

  // Extract only the 'label' property from each day object
  const extractedOfficeDays = parsedOfficeDays.map((day) => day.label);

  return (
    <>
      <MainNavbar />

    <div className="doctor-details mt-2">
        <h1>{doctor.name}</h1>
        <div className="doctor-specialization">{doctor.specialization}</div>
            <div className="hospital-info">
                <div>{doctor.hospitalOrClinic}</div>
                <div>{doctor.address}</div>
            </div>
            <div className="office-info">
                <div className="office-hours">
                    Office Hours: {doctor.officeHoursStart} - {doctor.officeHoursEnd}
                </div>
            <div className="office-days">
                Office Days: {extractedOfficeDays.length > 0 ? extractedOfficeDays.join(', ') : 'No Office Days'}
            </div>
        </div>
        <div className="fees">{`Fees per Consultation: NRs. ${doctor.feesPerConsultation}/-`}</div>
            <div className="date-time-picker">
                <DatePicker className="date-picker" 
                    format="DD-MM-YYYY" 
                    onChange={(value) => {
                      setDate(moment(value).format('DD-MM-YYYY'))
                    }} 
                />
                <TimePicker className="time-picker" 
                    format="HH:mm" 
                    onChange={(value) => {
                      setTime(moment(value).format('HH:mm')) 
                    }}
                />
                <button 
                  className="check-availability-btn m-1"
                  onClick={handleAvailability}
                >
                    Check Availability
                </button>
                
                   <button 
                    className="check-availability-btn" 
                    onClick={handleBooking}
                  >
                    Book Now
                </button>
                
                
            </div>
        </div>
    </>
 );
};

export default BookingPage;