// MyOrders.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h2>My Orders</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              {/* Display order details as needed */}
              Order ID: {order._id}, Total Price: {order.totalPrice}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
