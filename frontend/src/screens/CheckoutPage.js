import React ,{useState} from 'react';
import { useCart } from '../context/cart';
// import MainNavbar from '../components/Navbar';
import EcomHeader from '../components/EcomHeader';
import axios from 'axios';
import '../styles/CheckoutPage.css';

const CheckoutPage = () => {

  const [cart] = useCart();

  // Calculate total bill
  const calculateTotal = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price * item.numberOfItems;
    });
        console.log(total)
        console.log(typeof total)

    return total;
  };

  //khalti
  const [paymentData, setPaymentData] = useState({
    return_url: 'http://localhost:3000/payment/',
    website_url: 'http://localhost:3000/',
    amount: calculateTotal()*100,
    purchase_order_id: Math.random().toString(36).substring(2, 9),
    purchase_order_name: 'test',
    customer_info: {
     name: '',
      email: '',
      phone: '',
    },
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If the field is 'amount', parse the value to a number
    const newValue = name === 'amount' ? parseFloat(value) : value;
    setPaymentData((prevData) => ({
      ...prevData,
      customer_info: {
        ...prevData.customer_info,
        [name]: newValue,
      },
    }));
  };

   const handleKhaltiButtonClick = () => {
    // Generate a random purchase order ID
    const randomOrderId = Math.floor(Math.random() * 100).toString();
    
    // Set the random purchase order ID
    setPaymentData((prevData) => ({
      ...prevData,
      purchase_order_id: randomOrderId,
    }));
    
    const backendEndpoint = 'http://localhost:8080/khalti-payment';

    axios.post(backendEndpoint, paymentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Payment successful:', response.data);
        
        // Extract the payment URL from the response
        const paymentUrl = response.data.payment_url;
        // Redirect the user to the payment URL
        window.location.href = paymentUrl;
      })
      .catch(error => {
        console.error('Error sending payment data:', error);
        // Handle error or show an error message to the user
      });
  };

  return (
    <>
    {/* <MainNavbar /> */}
    <EcomHeader />
    <div className='text-center border p-4 mt-4'>
      <h2 className='mb-4'>Please enter your details to proceed with payment</h2>
      <form>
   <label>
    Name:
   <input
  type="text"
  name="name"
   value={paymentData.customer_info.name}
            onChange={handleInputChange}
/>
  </label>
  <br />
  <label>
    Phone:
    <input
  type="tel"
  name="phone"
  value={paymentData.customer_info.phone}
  onChange={handleInputChange}
/>
  </label>
  <br />
  <label>
    Email:
   <input
  type="email"
  name="email"
  value={paymentData.customer_info.email}
  onChange={handleInputChange}
/>
  </label>
  <br />
  
</form>


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
      <h3 className='mt-4'>Grand Total: NPR <span className='font-weight-bold'>{calculateTotal()}/-</span></h3>
      <div className='payment-options mt-4'>
        <button className='btn btn-primary mr-2'  onClick={handleKhaltiButtonClick}>Pay with Khalti</button>
      </div>
    </div>

    </>
  );
};

export default CheckoutPage;
