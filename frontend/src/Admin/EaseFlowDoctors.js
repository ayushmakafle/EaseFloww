import React, { useState, useEffect } from 'react';
import AdminMenu from './AdminMenu';
import MainNavbar from '../components/Navbar';
import axios from 'axios';
import { Table, Button, Modal } from 'antd';

const EaseFlowDoctors = () => {
    const [doctors, setDoctors] = useState([]);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Hospital or Clinic',
      dataIndex: 'hospitalOrClinic',
      key: 'hospitalOrClinic',
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
    },    
  ];
    //get all approved doctors
    const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/v1/auth/get-doctor');
      if (response.data.success) {
        setDoctors(response.data.doctors);
      } else {
        console.error('Error fetching approved doctors:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching approved doctors:', error.message);
    }
  };
   useEffect(() => {
    fetchDoctors();
  }, []); // Run this effect only once on component mount

  return (
    <>
    <MainNavbar />

     <div className='container-fluid m-3 p-3'>

    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu />
        </div>
        <div className='col-md-9'>
            <h1>EaseFlow Doctors</h1>
            <Table dataSource={doctors} columns={columns} />
        </div>
    </div>
    </div>
    </>
  )
}

export default EaseFlowDoctors

