import React, { useState, useEffect } from 'react';
import MainNavbar from '../components/Navbar';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { Table, Spin, Switch } from 'antd';
import moment from 'moment';

const EaseFlowOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load orders from localStorage when the component mounts
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
    fetchEaseFlowOrders();
  }, []);

  const handleUpdateDelivery = async (orderId, isDelivered) => {
  try {
    setLoading(true);
    setError(null);

    let deliveredAt = null;

    if (isDelivered) {
      // If the switch is turned on (Is Delivered), update the deliveredAt to the current date and time
      deliveredAt = new Date().toISOString(); // Convert to ISO format
    }

    const response = await axios.put(`/api/v1/order/update-delivery/${orderId}`, { isDelivered, deliveredAt });

    if (response.data.success) {
      // Fetch updated orders after successful update
      await fetchEaseFlowOrders(); // Make sure to await the fetchEaseFlowOrders function

      // Log the response to check the deliveredAt value
      console.log('Update Delivery Response:', response);

      // Update the state with the deliveredAt timestamp
      const updatedOrders = orders.map(order => {
        if (order.key === orderId) {
          return {
            ...order,
            isDelivered,
            deliveredAt: response.data.deliveredAt || deliveredAt,
          };
        }
        return order;
      });

      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    } else {
      setError(response.data.message);
    }
  } catch (error) {
    console.error('Error updating delivery status:', error.message);
    setError('An error occurred while updating the delivery status.');
  } finally {
    setLoading(false);
  }
};

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
          {moment(paidAt).format('YYYY-MM-DD')}
        </p>
      ),
    },
    {
      title: 'Is Delivered',
      dataIndex: 'isDelivered',
      key: 'isDelivered',
      render: (isDelivered, record) => (
        <Switch
          checked={isDelivered}
          onChange={checked => handleUpdateDelivery(record.key, checked)}
          loading={loading}
        />
      ),
    },
    {
      title: 'Delivered At',
      dataIndex: 'deliveredAt',
      key: 'deliveredAt',
      render: (_,data) => (
        <p className="mb-0">
          {`${data?.deliveredAt?`${moment().fromNow(data.deliveredAt)} ago`: "Not Delivered"}`}
          {/* {deliveredAt ? new Date(deliveredAt).toLocaleString() : 'Not Delivered'} */}
        </p>
      ),
    },
  ];

  const fetchEaseFlowOrders = async () => {
    try {
      setLoading(true);
      setError(null);

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
          deliveredAt: order.DeliveredAt,
        }));

        setOrders(ordersWithUsers);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching EaseFlow orders:', error.message);
      setError('An error occurred while fetching orders.');
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  // Fetch updated orders after successful update
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
            {loading && <Spin />}
            {error && <div>Error: {error}</div>}
            <Table dataSource={orders} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EaseFlowOrders;