import React, { useState, useEffect } from 'react';
import MainNavbar from '../components/Navbar';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { Table } from 'antd';

const EaseFlowOrders = () => {
  const [orders, setOrders] = useState([]);

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: user => (
        <div>
          <p>{user.username}</p>
          <p>{user.email}</p>
          {/* Add more user details if needed */}
        </div>
      ),
    },
    {
      title: 'Order Items',
      dataIndex: 'orderItems',
      key: 'orderItems',
      render: orderItems => (
        <div>
          {orderItems.map(item => (
            <div key={item._id}>
              <p>Name: {item.name}</p>
              <p>Quantity: {item.qyt}</p>
              <p>Price: {item.price}</p>
              <p>Product: {item.Product.name}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Payment Result',
      dataIndex: 'paymentResult',
      key: 'paymentResult',
      render: paymentResult => (
        <div>
          <p>ID: {paymentResult.id}</p>
          <p>Status: {paymentResult.status}</p>
          {/* Add more payment result details if needed */}
        </div>
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
