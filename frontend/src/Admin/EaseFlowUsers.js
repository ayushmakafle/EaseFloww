import React,{useState,useEffect} from 'react'
//import MainNavbar from '../components/Navbar'
import AdminMenu from './AdminMenu'
import axios from 'axios';
import { Table} from 'antd';

const EaseFlowUsers = () => {

  const [users, setUsers] = useState([]);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
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
  ];
    //get all users
   const fetchUsers = async () => {
  try {
    const response = await axios.get('/api/v1/auth/get-user');
    console.log('Response:', response);

    if (response.data.success) {
      setUsers(response.data.user);
    } else {
      console.error('Error fetching users:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching users:', error.message);
  }
};


   useEffect(() => {
    fetchUsers();
  }, []); // Run this effect only once on component mount

  return (
    <>
    {/* <MainNavbar /> */}

     <div className='container-fluid m-3 p-3'>

    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu />
        </div>
        <div className='col-md-9'>
            <h1 style={{color:'#ef5e99',margin:'20px'}}>All EaseFlow Users</h1>
             <Table dataSource={users} columns={columns} style={{margin:'20px'}}/>
        </div>
    </div>
    </div>
    </>
  )
}

export default EaseFlowUsers

