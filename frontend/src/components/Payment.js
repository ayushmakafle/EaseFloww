
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import MainNavbar from './Navbar';
import EcomHeader from './EcomHeader';
import MainFooter from './footer';
import {useNavigate} from 'react-router-dom'
import { useCart } from '../context/cart'; // Import useCart hook

const PaymentComponent = () => {

  const navigate= useNavigate();
  const [cart] = useCart(); // Use useCart hook to access cart items


  const [paymentData, setPaymentData] = useState({
    amount: 0,
    purchaseOrderId: '',
    transactionId: '',
    pidx: '',
  });

const updateProductQuantities = async () => {
  try {
    console.log('Updating product quantities...');
    console.log('Cart items:', cart);

    // For each item in the cart, send a request to update the product quantity
    await Promise.all(cart.map(async (item) => {
      console.log('Updating quantity for item:', item);
      await axios.post('/api/v1/product/updateStock', {
        productId: item._id,
        newQuantity: item.quantity - item.numberOfItems,
      });
      console.log('Product quantity updated successfully for item:', item);
    }));

    console.log('Product quantities updated successfully');
    // Optionally, you can perform additional actions after successful update
  } catch (error) {
    console.error('Error updating product quantities:', error);
    // Handle error case if the update fails
  }
};


  useEffect(() => {
    // Function to extract query parameters from the URL
    const getUrlParameter = (name) => {
      name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
      const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      const results = regex.exec(window.location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Get data from URL
    const amount = getUrlParameter('amount') / 100;
    const purchaseOrderId = getUrlParameter('purchase_order_id');
    const transactionId = getUrlParameter('transaction_id');
    const pidx = getUrlParameter('pidx');

    // Set state
    setPaymentData({
      amount,
      purchaseOrderId,
      transactionId,
      pidx,
    });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Function to send order details to the backend
  const sendOrderDetails = () => {
    // Retrieve user details from local storage
    const storedUser = JSON.parse(localStorage.getItem('auth'))?.user;

    // Retrieve order items from local storage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Prepare order details
    const orderDetails = {
      User: storedUser?._id,
      orderItems: storedCart,
      paymentResult: {
        id: paymentData.transactionId,
        status: 'Completed',
        update_time: new Date().toISOString(),
        email_address: storedUser?.email,
      },
      totalPrice: paymentData.amount,
      isPaid: true,
      paidAt: new Date().toISOString(),
      isDelivered: false,
      DeliveredAt: null,
      // ... other order details
    };

    // Make a POST request to send order details to the backend
    axios.post('/api/v1/order/create-orders', orderDetails)
      .then(response => {
        console.log('Order details sent successfully:', response.data);
        // Remove cart details from local storage after successful order creation
      localStorage.removeItem('cart');      
    })
      .catch(error => {
        console.error('Error sending order details:', error);
        // Handle error if needed
      });
  };

  useEffect(() => {
    // Make a POST request to Khalti API using pidx
    if (paymentData.pidx) {
      const khaltiLookupEndpoint = '/khalti-verify';

      axios.post(khaltiLookupEndpoint, { pidx: paymentData.pidx }, {
        headers: {
          'Authorization': 'key 805eb6763170463489be3ba2b735cde0',
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          console.log('Khalti Lookup Response:', response.data);
          console.log(response.data.status);

          if (response.data.status === 'Completed') {
            // Automatically send order details when status is 'Completed'
            sendOrderDetails();
            navigate('/paysuccess')
            updateProductQuantities()
          }

          // Handle the Khalti API response here
        })
        .catch(error => {
          console.error('Error making Khalti Lookup request:', error);
          // Handle the error here
        });
    }
  }, [paymentData.pidx]);

  return (
    <>
    {/* <MainNavbar /> */}
    <EcomHeader />
    <div>
      <h2>Payment Details</h2>
      <p>Amount: {paymentData.amount}</p>
      <p>Purchase Order ID: {paymentData.purchaseOrderId}</p>
      <p>Transaction ID: {paymentData.transactionId}</p>
      <p>Pidx: {paymentData.pidx}</p>
    </div>
    <MainFooter />
    </>
  );
};

export default PaymentComponent;