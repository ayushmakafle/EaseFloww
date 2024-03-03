import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';
import DoctorNavbar from './DoctorNavbar';
import {toast} from 'react-toastify';
import { useAuth } from '../context/auth';

const DoctorAppointments = () => {

  const [auth] = useAuth()
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      console.log(auth)
      console.log(auth.doctor._id)
      const response = await axios.get(`/api/v1/appointment/doctor-appointments/${auth.doctor._id}`);
      const sortedAppointments = response.data.data.sort((a, b) => {
      // Convert dates to moment objects for comparison
      const dateA = moment(a.date, 'DD-MM-YYYY');
      const dateB = moment(b.date, 'DD-MM-YYYY');
      // Sort in descending order
      return dateB - dateA;
    });
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

const columns = [
  {
    title: "Serial Number",
    dataIndex: "serialNumber",
    key: "serialNumber",
    render: (text, record, index) => index + 1,
  },

  {
    title: "Patient Name",
    dataIndex: "patientName", // Use 'patientName' as the dataIndex
    key: "patientName",
  },
  {
    title: "Patient Age",
    dataIndex: "patientAge", // Use 'patientAge' as the dataIndex
    key: "patientAge",
  },
  {
    title: "Patient Contact",
    dataIndex: "patientContact", // Use 'patientContact' as the dataIndex
    key: "patientContact",
  },
  {
    title: "Booked By",
    dataIndex: "userInfo",
    render: (text, record) => (
      <span>{record.userInfo ? JSON.parse(record.userInfo) : ""}</span>
    ),
    key: "userInfo",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text, record) => {
      const date = moment(record.date, "DD-MM-YYYY");
      console.log("Raw Date Value:", record.date);
      console.log("Parsed Date Object:", date.toDate());
      return date.isValid() ? date.format("DD-MM-YYYY") : "N/A";
    },
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    render: (text, record) => {
      if (record && record.startTime && record.endTime) {
        const startTime = moment(record.startTime);
        const endTime = moment(record.endTime);
        if (startTime.isValid() && endTime.isValid()) {
          return `${startTime.format("h:mm A")} - ${endTime.format("h:mm A")}`;
        }
      }
      return "N/A";
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, record) => (
      <div>
        {record.status === "Pending" && (
          <>
            <button onClick={() => handleAccept(record._id)} className="m-1">
              Accept
            </button>
            <button onClick={() => handleReject(record._id)}>Reject</button>
          </>
        )}
      </div>
    ),
  },
];


const handleAccept = async (id) => {
  try {
    await axios.put(`/api/v1/appointment/accept/${id}`);
    // Refresh appointments after accepting
    fetchAppointments();
    toast.success('Appointment accepted');
  } catch (error) {
    console.error("Error accepting appointment:", error);
  }
};

const handleReject = async (id) => {
  try {
    await axios.put(`/api/v1/appointment/reject/${id}`);
    // Refresh appointments after rejecting
    fetchAppointments();
    toast.success('Appointment rejected');

  } catch (error) {
    console.error("Error rejecting appointment:", error);
  }
};


  return (
    <>
    <DoctorNavbar />
    <div>
      <Table columns={columns} dataSource={appointments} className='m-2'/>
    </div>
    </>
  );
};

export default DoctorAppointments;