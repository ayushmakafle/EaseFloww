// PaymentComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    purchaseOrderId: '',
    transactionId: '',
    pidx: '',
  });

  useEffect(() => {
    // Function to extract query parameters from the URL
    const getUrlParameter = (name) => {
      name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
      const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      const results = regex.exec(window.location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Get data from URL
    const amount = getUrlParameter('amount')/100;
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

    // Make a POST request to Khalti API using pidx
    if (pidx) {
      const khaltiLookupEndpoint = '/khalti-verify';

      axios.post(khaltiLookupEndpoint, { pidx }, {
        headers: {
          'Authorization': `key 805eb6763170463489be3ba2b735cde0`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          console.log('Khalti Lookup Response:', response.data);
          console.log(response.data.status)
          // Handle the Khalti API response here
        })
        .catch(error => {
          console.error('Error making Khalti Lookup request:', error);
          // Handle the error here
        });
    }
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h2>Payment Details</h2>
      <p>Amount: {paymentData.amount}</p>
      <p>Purchase Order ID: {paymentData.purchaseOrderId}</p>
      <p>Transaction ID: {paymentData.transactionId}</p>
      <p>Pidx: {paymentData.pidx}</p>
    </div>
  );
};

export default PaymentComponent;