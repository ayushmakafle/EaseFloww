import React, { useState, useEffect } from 'react';
import MainNavbar from '../components/Navbar';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { Table } from 'antd';

const EaseFlowOrders = () => {
  const [orders, setOrders] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'user',
      key: 'name',
      render: user => (
        <p className="mb-0">
          {user.username}
        </p>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'user',
      key: 'email',
      render: user => (
        <p className="mb-0">
          {user.email}
        </p>
      ),
    },
    
    {
      title: 'Payment Result',
      dataIndex: 'paymentResult',
      key: 'paymentResult',
      render: paymentResult => (
        <p className="mb-0">
        {paymentResult.status}
        </p>
      ),
    },
    {
      title: 'Paid At',
      dataIndex: 'paidAt',
      key: 'paidAt',
      render: paidAt => (
        <p className="mb-0">
          {paidAt}
        </p>
      ),
    },
    {
      title: 'Is Delivered',
      dataIndex: 'isDelivered',
      key: 'isDelivered',
      render: isDelivered => (
        <p className="mb-0">
          {isDelivered ? 'Yes' : 'No'}
        </p>
      ),
    },
    {
      title: 'Delivered At',
      dataIndex: 'deliveredAt',
      key: 'deliveredAt',
      render: deliveredAt => (
        <p className="mb-0">
          {deliveredAt}
        </p>
      ),
    },
  ];
  const fetchEaseFlowOrders = async () => {
    try {
      // Use the correct endpoint to fetch all orders with successful payments
      const response = await axios.get('/api/v1/order/all-orders');
      
      if (response.data.success) {
        const ordersWithUsers = response.data.orders.map(order => ({
          key: order._id,
          user: {
            username: order.User.username,
            email: order.User.email,
          },
          orderItems: order.orderItems,
          paymentResult: order.paymentResult,
          totalPrice: order.totalPrice,
          isPaid: order.isPaid,
          paidAt: order.paidAt,
          isDelivered: order.isDelivered,
          deliveredAt: order.deliveredAt,
        }));
  
        setOrders(ordersWithUsers);
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
            <h1>All EaseFlow Orders</h1>
            <Table dataSource={orders} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EaseFlowOrders;