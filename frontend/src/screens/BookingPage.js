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
  const params = useParams();
  const [auth] = useAuth();
  const [doctor, setDoctor] = useState(null);
  const { doctorId } = useParams();
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [time, setTime] = useState(null);

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

const handleAvailability = async () => {
  try {
    if (!date || !startTime || !endTime) {
      toast.error("Please select date, start time, and end time.");
      return;
    }

    // Use moment to format the selected times
    const formattedStartTime = moment(`${date} ${startTime}`, 'DD-MM-YYYY HH:mm').format('HH:mm');
    const formattedEndTime = moment(`${date} ${endTime}`, 'DD-MM-YYYY HH:mm').format('HH:mm');

    console.log("Formatted StartTime:", formattedStartTime);
    console.log("Formatted EndTime:", formattedEndTime);

    const res = await axios.post(
      "/api/v1/appointment/booking-availability",
      { doctorId: params.doctorId, date, startTime: formattedStartTime, endTime: formattedEndTime },
    );

    console.log("Backend Response:", res.data);

    if (res.data.success) {
      setIsAvailable(true);
      toast.success(res.data.message);
    } else {
      setIsAvailable(false);
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};




  const handleBooking = async () => {
    try {
      if (!isAvailable) {
        toast.error("Appointment slot not available. Please check availability first.");
        return;
      }

      const res = await axios.post(`/api/v1/appointment/book-appointment`, {
        doctorID: params.doctorId,
        userID: auth.user._id,
        doctorInfo: doctor,
        userInfo: auth.user,
        date,
        startTime,
        endTime,
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
          <DatePicker
            className="date-picker"
            format="DD-MM-YYYY"
            onChange={(value) => {
              setDate(moment(value).format('DD-MM-YYYY'));
            }}
          />
          <TimePicker
  className="time-picker"
  format="HH:mm"
  onChange={(value) => {
    // Use moment to format the selected time
    const formattedTime = moment(value).format('HH:mm');
    setTime(formattedTime);
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