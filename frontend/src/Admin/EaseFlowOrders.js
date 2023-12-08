import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainNavbar from '../components/Navbar';
import AdminMenu from './AdminMenu';
import { Table, Space } from 'antd';

const EaseFlowCustomers = () => {
  const [order, setOrders] = useState([]);

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: user => (
        <Space size="middle">
          <span>{user.username}</span>
          <span>{user.email}</span>
          {/* Add more user details if needed */}
        </Space>
      ),
    },
    {
      title: 'Order Items',
      dataIndex: 'orderItems',
      key: 'orderItems',
      render: orderItems => (
        <Space size="middle">
          {orderItems.map(item => (
            <div key={item._id}>
              <p>Name: {item.name}</p>
              <p>Quantity: {item.qyt}</p>
              <p>Price: {item.price}</p>
              <p>Product: {item.Product.name}</p>
            </div>
          ))}
        </Space>
      ),
    },
    {
      title: 'Payment Result',
      dataIndex: 'paymentResult',
      key: 'paymentResult',
      render: paymentResult => (
        <Space size="middle">
          <p>ID: {paymentResult.id}</p>
          <p>Status: {paymentResult.status}</p>
          {/* Add more payment result details if needed */}
        </Space>
      ),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Is Paid',
      dataIndex: 'isPaid',
      key: 'isPaid',
    },
    {
      title: 'Paid At',
      dataIndex: 'paidAt',
      key: 'paidAt',
    },
    {
      title: 'Is Delivered',
      dataIndex: 'isDelivered',
      key: 'isDelivered',
    },
    {
      title: 'Delivered At',
      dataIndex: 'deliveredAt',
      key: 'deliveredAt',
    },
  ];

  // EaseFlowOrders Component
const fetchEaseFlowOrders = async () => {
  try {
    const response = await axios.get('/api/v1/order/get-easeflow-orders');
    console.log('Backend Response:', response);

    if (response.data.success) {
      setOrders(response.data.orders);
    } else {
      console.error('Error fetching EaseFlow orders:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching EaseFlow orders:', error.message);
  }
};

useEffect(() => {
  fetchEaseFlowOrders();
}, []);


  return (
    <>
      <MainNavbar />

      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>All EaseFlow Customers</h1>
            <Table dataSource={order} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EaseFlowCustomers