import React, { useEffect, useState } from "react";
import DoctorNavbar from "./DoctorNavbar";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "./animation.json"; // Corrected import statement

import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";

const DoctorProfile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [officeHoursStart, setOfficeHoursStart] = useState("");
  const [officeHoursEnd, setOfficeHoursEnd] = useState("");
  const [officeDays, setOfficeDays] = useState("");
  const [feesPerConsultation, setFeesPerConsultation] = useState("");
  const [doctor, setDoctor] = useState(null);

  // Fetch doctor data
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get("/api/v1/auth/doctor-data");
        if (response.data.success) {
          console.log(response.data);
          const doctorData = response.data.data;
          const {
            name,
            email,
            phonenumber,
            address,
            officeHoursStart,
            officeHoursEnd,
            feesPerConsultation,
            officeDays,
          } = doctorData;
          setName(name);
          setEmail(email);
          setPhonenumber(phonenumber);
          setAddress(address);
          setOfficeHoursStart(officeHoursStart);
          setOfficeHoursEnd(officeHoursEnd);
          setFeesPerConsultation(feesPerConsultation);
          setOfficeDays(officeDays);
          setDoctor(doctorData); // Set the doctor object here
        } else {
          console.error("Error fetching doctor data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, []);

  // Parse the officeDays string into an array of objects or use an empty array if falsy
  const parsedOfficeDays = officeDays ? JSON.parse(officeDays) : [];

  // Extract only the 'label' property from each day object
  const extractedOfficeDays = parsedOfficeDays.map((day) => day.label);

  return (
    <>
      <DoctorNavbar />
      <h2 style={styles.profileTitle}>Your Doctor Profile</h2>
      <p style={styles.profileDescription}>
        This is how your profile looks like to our EaseFlow users.
      </p>
      <div style={styles.doctorProfileContainer}>
        <Lottie
          options={{
            animationData: animationData,
            loop: true,
            autoplay: true,
          }}
          className="lottie-animation-doctor-profile"
          style={{ width: "200px", height: "200px", marginBottom: "20px" }}
        />

        {doctor ? (
          <div style={styles.doctorDetails}>
            <h1 style={styles.doctorName}>{doctor.name}</h1>
            <div style={styles.doctorSpecialization}>
              {doctor.specialization}
            </div>
            <div style={styles.hospitalInfo}>
              <div>{doctor.hospitalOrClinic}</div>
              <div>{doctor.address}</div>
            </div>
            <div style={styles.officeInfo}>
              <div style={styles.officeHours}>
                Office Hours: {doctor.officeHoursStart} -{" "}
                {doctor.officeHoursEnd}
              </div>
              <div style={styles.officeDays}>
                {extractedOfficeDays.length > 0
                  ? `Office Days: ${extractedOfficeDays.join(", ")}`
                  : "No Office Days"}
              </div>
            </div>
            <div
              style={styles.fees}
            >{`Fees per Consultation: NRs. ${doctor.feesPerConsultation}/-`}</div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <Link to="/dashboard/doctor/update-schedule">
          <button
            type="button"
            style={{ backgroundColor: "#ef5e99", color: "white" }}
          >
            Update Schedule
          </button>
        </Link>
      </div>
    </>
  );
};

const styles = {
  doctorProfileContainer: {
    textAlign: "center",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    maxWidth: "600px",
  },
  profileTitle: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#ff0066", // Darker pink for the title
    textAlign: "center",
    marginTop: "20px",
  },
  profileDescription: {
    fontSize: "16px",
    marginBottom: "20px",
    color: "black", // Darker pink for the description
    textAlign: "center",
  },
  doctorDetails: {
    marginTop: "20px",
  },
  doctorName: {
    fontSize: "1.5em",
    marginBottom: "10px",
    color: "#ff0066", // Darker pink for the name
    fontWeight: "bold",
  },
  doctorSpecialization: {
    color: "#ff66b2", // Lighter pink for specialization
    marginBottom: "15px",
  },
  hospitalInfo: {
    marginBottom: "10px",
  },
  officeInfo: {
    fontStyle: "normal",
    marginTop: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
  },
  officeHours: {
    fontStyle: "italic",
    marginBottom: "5px",
  },
  officeDays: {
    fontStyle: "italic",
    marginBottom: "10px",
  },
  fees: {
    marginTop: "10px",
    color: "#ff0066", // Darker pink for fees
    fontWeight: "bold", // Make fees bold
  },
};

export default DoctorProfile;
