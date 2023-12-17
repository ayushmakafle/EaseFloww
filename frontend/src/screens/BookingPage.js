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


  //for getting doctor information
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

  //to check the doctor state
  useEffect(() => {
    console.log('Doctor:', doctor);
  }, [doctor]);

  const handleAvailability = async () => {
    try {
      console.log("Selected Date:", date);
      console.log("Selected Time:", time);
      if (!date || !time) {
        toast.error("Please select both date and time.");
        return;
      }
      const formattedStartTime = moment(`${date} ${time}`, 'DD-MM-YYYY HH:mm').format('HH:mm');
      const formattedEndTime = moment(`${date} ${time}`, 'DD-MM-YYYY HH:mm').add(1, 'hours').format('HH:mm');
      console.log("Formatted Start Time:", formattedStartTime);
      console.log("Formatted End Time:", formattedEndTime);
      const res = await axios.post(
        "/api/v1/appointment/booking-availability",
        { doctorID: params.doctorId, date, startTime: formattedStartTime, endTime: formattedEndTime },
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

  //for booking
  const handleBooking = async () => {
  try {
    console.log("Selected Date:", date);
    console.log("Selected Time:", time);
    if (!isAvailable) {
      toast.error("Appointment slot not available. Please check availability first.");
      return;
    }
    // Use moment to format the selected time
    const formattedTime = moment(time, 'HH:mm').format('HH:mm');    
    const selectedDate = moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY');
    const res = await axios.post(`/api/v1/appointment/book-appointment`, {
      doctorID: params.doctorId,
      userID: auth.user._id,
      doctorInfo: doctor.name,
      userInfo: auth.user.username,
      date: selectedDate, 
      startTime: formattedTime,
      endTime: moment(`${selectedDate} ${formattedTime}`, 'DD-MM-YYYY HH:mm').add(1, 'hours').format('HH:mm'),
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
        <div className="office-info" style={{fontStyle:'normal'}}>
          <div className="office-hours">
            Office Hours: {doctor.officeHoursStart} - {doctor.officeHoursEnd}
          </div>
          <div className="office-days">
            Office Days: {extractedOfficeDays.length > 0 ? extractedOfficeDays.join(', ') : 'No Office Days'}
          </div>
        </div>
        <div className="fees">{`Fees per Consultation: NRs. ${doctor.feesPerConsultation}/-`}</div>
        <div className='des'>
          Your appointment will scheduled for a one-hour duration. Please select the desired start time.
        </div>
        <div className="date-time-picker">
        <DatePicker
          className="date-picker"
          format="DD-MM-YYYY"
          onChange={(value) => {
            // Update state with the selected date in the required format
            setDate(value.format('DD-MM-YYYY'));
          }}
          // Use the disabledDate prop to disable dates before today
          disabledDate={(current) => current && current < moment().startOf('day')}
        />


        <TimePicker
          className="time-picker"
          format="HH:mm"
          onChange={(value) => {
            // Update state with the selected time in the required format
            setTime(value.format('HH:mm'));
          }}
        />

        <button
          className="check-availability-btn m-1"
          onClick={handleAvailability}
        >
          Check Availability
        </button>
        {/* Conditionally render the "Book Now" button */}
        {isAvailable && (
          <button
            className="check-availability-btn"
            onClick={handleBooking}
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  </>
 );
};

export default BookingPage;