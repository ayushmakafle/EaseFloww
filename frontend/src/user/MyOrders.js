import React, { useState, useEffect } from 'react';
import MainNavbar from '../components/Navbar';
import UserMenu from './UserMenu';
import axios from 'axios';
import { Table, Spin } from 'antd';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserOrders();
  }, []); // Fetch orders when the component mounts

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      // Make a request to fetch the user's orders
      const response = await axios.get('/api/v1/order/orders');

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user orders:', error.message);
      setError('An error occurred while fetching orders.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
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
      render: isPaid => (isPaid ? 'True' : 'False'),
    },
    {
      title: 'Paid At',
      dataIndex: 'paidAt',
      key: 'paidAt',
    },

      {
        title: 'Shipping',
        dataIndex: 'isDelivered',
        key: 'isDelivered',
        render: (isDelivered, record) => {
          const deliveredAtDate = new Date(record.deliveredAt);

          return (
            <>
              {isDelivered ? (
                isNaN(deliveredAtDate) || deliveredAtDate.toString() === 'Invalid Date' ? (
                  'Completed'
                ) : (
                  `Completed at ${deliveredAtDate.toLocaleString()}`
                )
              ) : (
                'On the Way'
              )}
            </>
          );
        },
      },
      {
        title: 'Delivered At',
        dataIndex: 'deliveredAt',
        key: 'deliveredAt',
        render: (deliveredAt, record) => {
          const deliveredAtDate = new Date(deliveredAt);

          return (
            <>
              {record.isDelivered && !isNaN(deliveredAtDate) && deliveredAtDate.toString() !== 'Invalid Date'
                ? deliveredAtDate.toLocaleString()
                : ''}
            </>
          );
        },
      },
  ];


  return (
    <>
      <MainNavbar />
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <h2>My Orders</h2>
            {loading && <Spin />}
            {error && <p>Error: {error}</p>}
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <Table dataSource={orders} columns={columns} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;