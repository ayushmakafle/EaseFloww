import React, { useEffect, useState } from 'react';
import UserMenu from './UserMenu';
// import MainNavbar from '../components/Navbar';
import axios from 'axios';
import moment from 'moment'; // Import the moment library
import { Table, Spin } from 'antd';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);

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

  const columns = [
    {
      title: 'Appointment ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Doctor Info',
      dataIndex: 'doctorInfo',
      render: (text, record) => (
        <span>
          {record.doctorInfo ? JSON.parse(record.doctorInfo) : ''}
        </span>
      ),
      key: 'doctorInfo',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
 {
  title: 'Time',
  dataIndex: 'time',
  key: 'time',
  render: (text, record) => {
    if (record && record.startTime && record.endTime) {
      const startTime = moment(record.startTime);
      const endTime = moment(record.endTime);
      if (startTime.isValid() && endTime.isValid()) {
        return `${startTime.format('h:mm A')} - ${endTime.format('h:mm A')}`;
      }
    }
    return 'N/A';
  },
},

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
            <h2>My Appointments</h2>
            {appointments.length === 0 ? (
              <p>No appointments found.</p>
            ) : (
              <Table dataSource={appointments} columns={columns} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAppointments;
