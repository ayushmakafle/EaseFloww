// SuccessPage.js
import React from 'react';
import { Link } from 'react-router-dom';
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

        {/* Button to navigate to the user dashboard */}
        <Link to="/dashboard/user">
          <button type="button">Go to User Dashboard</button>
        </Link>
      </div>
      <MainFooter />
    </>
  );
};

export default SuccessPage;
