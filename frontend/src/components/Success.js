// SuccessPage.js
import React from 'react';
import MainNavbar from './Navbar';
import EcomHeader from './EcomHeader';
import MainFooter from './footer';

const SuccessPage = () => {
  return (
    <>
    <MainNavbar />
    <EcomHeader />
    <div>
      <h2>Payment Successful!</h2>
      <p>Thank you for your payment.</p>
      <p>Your transaction was successful.</p>
    </div>
    <MainFooter />
  </>
  );
};

export default SuccessPage;