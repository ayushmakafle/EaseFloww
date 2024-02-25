import React, { useEffect, useState } from 'react';
// import MainNavbar from '../components/Navbar';
import axios from 'axios';
import { toast } from "react-toastify";

import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment'; //js library to parse,validate,manipulate date object
import './BookingPage.css';
import { useAuth } from '../context/auth';
import { Modal, Input } from 'antd';
import { ReactComponent as Loading } from '../components/loadinganimation.svg';


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
  const [showModal, setShowModal] = useState(false); 
  const [patientName, setPatientName] = useState(''); 
  const [patientAge, setPatientAge] = useState(''); 
  const [patientContact, setPatientContact] = useState(''); 
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [contactError, setContactError] = useState("");
    const [showErrors, setShowErrors] = useState(false);


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
        setShowNotification(false); 
        toast.success(res.data.message);
      } else {
        setIsAvailable(false);
        setNotificationMessage(res.data.message); // Set notification message
        setShowNotification(true); // Show the notification
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('You need to login to book an appointment')
    }
  };

 const handleBooking = async () => {
    try {
      if (!isAvailable) {
        toast.error("Appointment slot not available. Please check availability first.");
        return;
      }

      // Show modal for patient info
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmBooking = async () => {
    try {
      // Validation checks for patient information
      let nameValidationError = "";
      let ageValidationError = "";
      let contactValidationError = "";

      if (!/^[a-zA-Z]{3,}$/.test(patientName)) {
        nameValidationError = "Please enter a valid patient name.";
      }

      const ageNumber = parseInt(patientAge, 10);
      if (isNaN(ageNumber) || ageNumber < 8 || ageNumber > 60) {
        ageValidationError = "Please enter a valid age.";
      }

      if (!/^\d{10}$/.test(patientContact)) {
        contactValidationError = "Please enter a valid 10-digit phone number.";
      }

      // Check if any validation errors exist
      if (nameValidationError || ageValidationError || contactValidationError) {
        // Update error state variables
        setNameError(nameValidationError);
        setAgeError(ageValidationError);
        setContactError(contactValidationError);

        // Display all error messages
        setShowErrors(true);

        // Show toast message for validation error
        toast.error("Please enter valid information.");
        return;
      }

      // Perform booking with patient information
      const formattedTime = moment(time, "HH:mm").format("HH:mm");
      const selectedDate = moment(date, "DD-MM-YYYY").format("DD-MM-YYYY");
      const res = await axios.post(`/api/v1/appointment/book-appointment`, {
        doctorID: params.doctorId,
        userID: auth.user._id,
        doctorInfo: doctor.name,
        userInfo: auth.user.username,
        date: selectedDate,
        startTime: formattedTime,
        endTime: moment(`${selectedDate} ${formattedTime}`, "DD-MM-YYYY HH:mm")
          .add(1, "hours")
          .format("HH:mm"),
        patientName,
        patientAge,
        patientContact,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setShowNotification(true); // Show the success notification
        setNotificationMessage("Appointment booked successfully"); // Set notification message
        setIsAvailable(false); // Hide the "Book Now" button
      }
    } catch (error) {
      console.error(error);

      // Show toast message for general error
      toast.error("An error occurred. Please try again later.");
    } finally {
      setShowModal(false);
    }
  };
  // Render loading state
  if (!doctor) {
    return (
      <>
        <Loading />
      </>
    );
  }

 // Parse the officeDays string into an array of objects or use an empty array if falsy
 const parsedOfficeDays = doctor.officeDays ? JSON.parse(doctor.officeDays) : [];
  // Map the days to their corresponding numerical values
  const daysMap = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
  };

  // Extract the numerical values of the available days
  const availableDays = parsedOfficeDays.map(day => daysMap[day]);

  // Extract only the 'label' property from each day object
  const extractedOfficeDays = parsedOfficeDays.map((day) => day.label);

    // Parse the office hours into moment objects
  const officeHoursStart = moment(doctor.officeHoursStart, 'HH:mm');
  const officeHoursEnd = moment(doctor.officeHoursEnd, 'HH:mm');

// Function to generate an array of disabled times
const disabledTime = (current) => {
  const currentTime = current.clone();
  const officeStart = officeHoursStart.clone();
  const officeEnd = officeHoursEnd.clone();

  // Disable times before the office hours start or after the office hours end
  return (
    currentTime.isBefore(officeStart, 'hour') ||
    currentTime.isAfter(officeEnd, 'hour')
  );
};

// CSS for custom styling
const customStyles = `
.ant-input:focus,
.ant-input:hover,
.ant-picker:hover .ant-picker-input,
.ant-picker-focused .ant-picker-input {
  border-color: pink;
  box-shadow: 0 0 0 2px rgba(255, 105, 180, 0.2);
}
.ant-modal-title {
  text-align: center;
  color: pink;
}
.ant-picker:hover .ant-picker-input,
.ant-picker-focused .ant-picker-input {
  border-color: pink;
}
`;

  return (
    <>
      <style>{customStyles}</style>

      {/* <MainNavbar /> */}
      <div className="doctor-details mt-2">
        <h1>{doctor.name}</h1>
        <div className="doctor-specialization">{doctor.specialization}</div>
        <div className="hospital-info">
          <div>{doctor.hospitalOrClinic}</div>
          <div>{doctor.address}</div>
        </div>
        <div className="office-info" style={{ fontStyle: "normal" }}>
          <div className="office-hours">
            Office Hours: {doctor.officeHoursStart} - {doctor.officeHoursEnd}
          </div>
          <div className="office-days">
            Office Days:{" "}
            {extractedOfficeDays.length > 0
              ? extractedOfficeDays.join(", ")
              : "No Office Days"}
          </div>
        </div>
        <div className="fees">{`Fees per Consultation: NRs. ${doctor.feesPerConsultation}/-`}</div>
        <div className="des">
          Your appointment will scheduled for a one-hour duration. Please select
          the desired start time.
        </div>
        <div className="date-time-picker">
          <DatePicker
            className="date-picker"
            format="DD-MM-YYYY"
            onChange={(value) => {
              // Update state with the selected date in the required format
              setDate(value.format("DD-MM-YYYY"));
            }}
            // Use the disabledDate prop to disable dates not in the available days
            disabledDate={(current) => {
              const dayOfWeek = current.format("dddd");
              return (
                (current && current < moment().startOf("day")) || // Disable past dates
                !parsedOfficeDays.some((day) => day.value === dayOfWeek) // Disable days not in the available days
              );
            }}
          />

          <TimePicker
            className="time-picker"
            format="HH:mm"
            onChange={(value) => {
              // Update state with the selected time in the required format
              setTime(value.format("HH:mm"));
            }}
            // Use disabledHours and disabledMinutes props to disable times outside office hours
            disabledHours={() =>
              Array.from({ length: 24 }, (_, i) => i).filter(
                (hour) =>
                  hour < officeHoursStart.hour() ||
                  hour >= officeHoursEnd.hour()
              )
            }
            disabledMinutes={() => []} // Allow all minutes
          />

          <button
            className="check-availability-btn m-1"
            onClick={handleAvailability}
          >
            Check Availability
          </button>

          {/* Conditionally render the notification */}
          {showNotification && (
            <div className="notification" style={{ color: "red" }}>
              {notificationMessage}
            </div>
          )}

          {/* Conditionally render the "Book Now" button */}
          {isAvailable && (
            <button className="check-availability-btn" onClick={handleBooking}>
              Book Now
            </button>
          )}
        </div>
      </div>
      {/* Modal for patient information */}
      <Modal
        title={<span style={{ color: '#ef5e99' }}>Enter Patient Information</span>}
        style={{ textAlign: 'center' }}  // Add styles to the title
        visible={showModal}
        onOk={confirmBooking}
        onCancel={() => {
          setShowModal(false);
          // Reset error messages and hide errors when canceling the modal
          setNameError('');
          setAgeError('');
          setContactError('');
          setShowErrors(false);
        }}
        okButtonProps={{ style: { backgroundColor: '#ef5e99', borderColor: '#ef5e99' } }} // Add inline styles to make the button pink
        cancelButtonProps={{ className: "cancel-btn" }} // Optionally, you can add styling to the cancel button
      >
        <Input
          style={{ margin: '10px 0' }}
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => {
            setPatientName(e.target.value);
            setNameError(''); // Clear the error when the input changes
          }}
        />
        {showErrors && <div className="error-message">{nameError}</div>} {/* Display the error message */}
        <Input
          style={{ margin: '10px 0' }}
          placeholder="Patient Age"
          value={patientAge}
          onChange={(e) => {
            setPatientAge(e.target.value);
            setAgeError(''); // Clear the error when the input changes
          }}
        />
        {showErrors && <div className="error-message">{ageError}</div>} {/* Display the error message */}
        <Input
          style={{ margin: '10px 0' }}
          placeholder="Patient Contact"
          value={patientContact}
          onChange={(e) => {
            setPatientContact(e.target.value);
            setContactError(''); // Clear the error when the input changes
          }}
        />
        {showErrors && <div className="error-message">{contactError}</div>} {/* Display the error message */}
      </Modal>
    </>
  );
};

export default BookingPage;