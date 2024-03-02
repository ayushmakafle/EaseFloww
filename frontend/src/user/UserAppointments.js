import React, { useEffect, useState } from 'react';
import UserMenu from './UserMenu';
// import MainNavbar from '../components/Navbar';
import axios from 'axios';
import moment from 'moment'; // Import the moment library
import { Table, Spin, Button,message } from 'antd';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/v1/appointment/user-appointments');
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      const response = await axios.put('/api/v1/appointment/cancel-appointment', { appointmentId });
      setLoading(false);
      if (response.data.success) {
        message.success('Appointment cancelled successfully');
        // Remove the cancelled appointment from the state
        setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
      } else {
        message.error('Failed to cancel appointment');
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      setLoading(false);
      message.error('Failed to cancel appointment');
    }
  };

  const columns = [
    // {
    //   title: "Appointment ID",
    //   dataIndex: "_id",
    //   key: "_id",
    // },
    {
      title: "SN.",
      dataIndex: "serialNo",
      render: (text, record, index) => index + 1,
      key: "serialNo",
    },
    {
      title: "Doctor",
      dataIndex: "doctorInfo",
      render: (text, record) => (
        <span>{record.doctorInfo ? JSON.parse(record.doctorInfo) : ""}</span>
      ),
      key: "doctorInfo",
    },
    {
      title: "Patient",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
            return `${startTime.format("h:mm A")} - ${endTime.format(
              "h:mm A"
            )}`;
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="danger"
          onClick={() => handleCancelAppointment(record._id)}
          disabled={record.status !== 'pending'} 
          loading={loading}
        >
          Cancel
        </Button>
      ),
    },
  ];

  return (
    <>
      {/* <MainNavbar /> */}
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <h2 style={{color:'#ef5e99',margin:'20px',fontWeight:'bold'}}>My Appointments</h2>
            {appointments.length === 0 ? (
              <p>No appointments found.</p>
            ) : (
              <Table dataSource={appointments} columns={columns} style={{margin:'20px'}}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAppointments;
