import React from 'react';
import { useCart } from '../context/cart';
import MainNavbar from '../components/Navbar';
import EcomHeader from '../components/EcomHeader';

const CheckoutPage = () => {
  
  

  const [cart] = useCart();

  // Calculate total bill
  const calculateTotal = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price * item.numberOfItems;
    });
    return total.toLocaleString('ne-NP', {
      style: 'currency',
      currency: 'NPR',
    });
  };

  return (
    <>
    <MainNavbar />
    <EcomHeader />
    <div className='text-center border p-4 mt-4'>
      <h2 className='mb-4'>Your Bill</h2>
       <table className='table'>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Number of Items</th>
            <th>Price per Item</th>
            <th>Item Total</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.numberOfItems}</td>
              <td>NPR {item.price} /-</td>
              <td>NPR {item.price * item.numberOfItems} /-</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className='mt-4'>Grand Total: <span className='font-weight-bold'>{calculateTotal()}</span></h3>
      <div className='payment-options mt-4'>
        <button className='btn btn-primary mr-2'>Pay with Khalti</button>
        <button className='btn btn-primary'>Cash on Delivery</button>
      </div>
    </div>

    </>
  );
};

export default CheckoutPage;
