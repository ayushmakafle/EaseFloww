import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';
import DoctorNavbar from './DoctorNavbar';
import {toast} from 'react-toastify';

const DoctorAppointments = () => {

  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/v1/appointment/doctor-appointments');
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
    title: 'Appointment Id',
    dataIndex: '_id',
    key: '_id',
  },
    {
    title: 'Patient',
    dataIndex: 'userInfo',
    key: 'userInfo',
  },
  /* {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text, record) => {
      const date = moment(record.date);
      return date.isValid() ? date.format('DD-MM-YYYY') : 'N/A';
    },
  }, */
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
    {
    title: 'Actions',
    key: 'actions',
    render: (text, record) => (
      <div>
        <button onClick={() => handleAccept(record._id)} className='m-1'>Accept</button>
        <button onClick={() => handleReject(record._id)}>Reject</button>
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