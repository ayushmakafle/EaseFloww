import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Table, Spin } from 'antd';
import MainNavbar from '../components/Navbar';
import AdminMenu from './AdminMenu';

const Appointments = ({ isAdmin }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAppointments = async () => {
    try {
      const endpoint =  '/api/v1/appointment/doctor-appointments';
      const res = await axios.get(endpoint);
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, [isAdmin]);

  const columns = [
    
    {
      title: 'Doctor Name',
      dataIndex: 'doctorInfo',
      render: (text, record) => (
        <span>
          {record.doctorInfo ? JSON.parse(record.doctorInfo) : ''}
        </span>
      ),
    },
    {
      title: 'User Name',
      dataIndex: 'userInfo',
      render: (text, record) => (
        <span>
          {record.userInfo ? JSON.parse(record.userInfo) : ''}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Start Date',
      dataIndex: 'startTime',
      render: (text, record) => (
        <span>
          {moment(record.startTime).format('DD-MM-YYYY HH:mm')}
        </span>
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'endTime',
      render: (text, record) => (
        <span>
          {moment(record.endTime).format('DD-MM-YYYY HH:mm')}
        </span>
      ),
    },
  ];
  
  return (
    <>
      {/* <MainNavbar /> */}
       <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1 style={{color:'#ef5e99',margin:'20px'}}>{isAdmin ? 'Admin Appointments' : 'All EaseFlow Appointments'}</h1>
            {loading ? (
              <Spin />
            ) : (
              <Table columns={columns} dataSource={appointments} style={{margin:'20px'}}/>
            )}
            {error && <div>Error: {error}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
